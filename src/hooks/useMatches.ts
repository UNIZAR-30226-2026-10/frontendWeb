"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { MatchesService } from "../services/matches.service";
import { CardsService } from "../services/cartas.service";
import { Carta } from "@/types/carta";
import {
  Partida,
  ChatMessage,
  throwDiceResponse,
  movimientosResponse,
} from "../types/partida";

function calcularMovimientosFrontend(
  partida: Partida,
  miJugador: any,
  tirada: number
): movimientosResponse[] {
  const movimientos: movimientosResponse[] = [];
  const tablero = partida.snapshotTablero;
  const estadoJugadores = partida.snapshotJugadores;

  const checkBlockInBox = (casilla: number): boolean => {
    let count = 0;
    for (const j of estadoJugadores.jugadores) {
      for (const f of j.fichas) {
        if (!f.meta && f.casilla === casilla) {
          count++;
        }
      }
    }
    return count >= 2;
  };

  let fichasBloqueadas: number[] = [];
  if (tirada === 6) {
    const posicionesFichas = miJugador.fichas
      .filter((f: any) => !f.meta)
      .map((f: any) => f.casilla);
    const bloqueoUsuario = posicionesFichas.find(
      (pos: number, index: number) => posicionesFichas.indexOf(pos) !== index
    );
    if (bloqueoUsuario !== undefined) {
      fichasBloqueadas = miJugador.fichas
        .filter((f: any) => f.casilla === bloqueoUsuario && !f.meta)
        .map((f: any) => f.id);
    }
  }

  for (const ficha of miJugador.fichas) {
    if (fichasBloqueadas.length > 0 && !fichasBloqueadas.includes(ficha.id))
      continue;
    if (ficha.meta) continue;

    let casillaActual = ficha.casilla;
    let pasos = tirada;
    let haciaAtras = false;
    let esBifurcacion = false;
    let casillaTablero;

    while (pasos > 0) {
      casillaTablero = tablero.casillas[casillaActual];
      if (!casillaTablero) break;

      if (!haciaAtras) {
        if (casillaTablero.tipo === "Meta") {
          haciaAtras = true;
          continue;
        }
        if (casillaTablero.tipo === "Bifurcacion") {
          esBifurcacion = true;
          break;
        }
        if (checkBlockInBox(casillaTablero.siguientes[0])) {
          if (
            miJugador.efectosActivos.some(
              (e: any) => e.resumenEfecto === "Saltar bloqueo"
            )
          ) {
            pasos++;
          } else {
            break;
          }
        }
        casillaActual = casillaTablero.siguientes[0];
        pasos--;
      } else {
        const indexAnterior = tablero.casillas.findIndex((casilla) =>
          casilla.siguientes.includes(casillaActual)
        );
        if (indexAnterior === -1 || checkBlockInBox(indexAnterior)) {
          break;
        }
        casillaActual = indexAnterior;
        pasos--;
      }
    }

    const movimiento: movimientosResponse = {
      fichaId: ficha.id,
      casillaDestino: casillaActual,
      esBifurcacion: esBifurcacion,
    };
    if (esBifurcacion && pasos > 0) {
      movimiento.pasosRestantes = pasos;
    }
    movimientos.push(movimiento);
  }

  return movimientos;
}

type UsePartidaParams = {
  partidaId?: string | null;
  username?: string | null;
  partidaInicial?: Partida | null;
};

export function usePartida({
  partidaId,
  username,
  partidaInicial = null,
}: UsePartidaParams) {
  const [partida, setPartida] = useState<Partida | null>(partidaInicial);
  const [ultimaTirada, setUltimaTirada] = useState<number | null>(null);
  const [tiradaExtra, setTiradaExtra] = useState<number | null>(null);
  const [movimientos, setMovimientos] = useState<movimientosResponse[]>([]);
  const [cargandoAccion, setCargandoAccion] = useState(false);
  const [errorPartida, setErrorPartida] = useState<string | null>(null);
  const [cargandoPartida, setCargandoPartida] = useState(true);
  const [mazoEnMano, setMazoEnMano] = useState<Carta[]>([]);

  const cargarPartida = useCallback(async () => {
    if (!partidaId || !username) {
      setCargandoPartida(false);
      return;
    }

    try {
      setCargandoPartida(true);
      setErrorPartida(null);

      const data = await MatchesService.obtenerEstadoPartida(partidaId, username);

      setPartida(data);
    } catch (error) {
      setErrorPartida(
        error instanceof Error ? error.message : "Error al cargar la partida"
      );
    } finally {
      setCargandoPartida(false);
    }
  }, [partidaId, username]);

  useEffect(() => {
    if (!partidaId || !username) {
      setCargandoPartida(false);
      return;
    }

    cargarPartida();

    const intervalId = window.setInterval(() => {
      cargarPartida();
    }, 3000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [partidaId, username, cargarPartida]);

  useEffect(() => {
    if (partida && username) {
      const miJugador = partida.snapshotJugadores.jugadores.find(
        (jugador) => jugador.username === username
      );

      if (
        miJugador &&
        miJugador.fase === "Movimiento" &&
        miJugador.ultimaTirada !== undefined &&
        miJugador.ultimaTirada !== null &&
        ultimaTirada === null &&
        movimientos.length === 0
      ) {
        setUltimaTirada(miJugador.ultimaTirada);
        const reconstructedMovs = calcularMovimientosFrontend(
          partida,
          miJugador,
          miJugador.ultimaTirada
        );
        setMovimientos(reconstructedMovs);
      }
    }
  }, [partida, username, ultimaTirada, movimientos]);

  const miJugador = useMemo(() => {
    if (!partida || !username) return null;

    return (
      partida.snapshotJugadores.jugadores.find(
        (jugador) => jugador.username === username
      ) ?? null
    );
  }, [partida, username]);

  const jugadorTurno = useMemo(() => {
    if (!partida) return null;

    return (
      partida.snapshotJugadores.jugadores[
        partida.snapshotJugadores.turnoActual
      ] ?? null
    );
  }, [partida]);

  const tuTurno = useMemo(() => {
    if (!username || !jugadorTurno) return false;

    return jugadorTurno.username === username;
  }, [jugadorTurno, username]);

  const jugadores = useMemo(() => {
    if (!partida) return [];

    const jugadorActual =
      partida.snapshotJugadores.jugadores[
        partida.snapshotJugadores.turnoActual
      ];

    const COLORES_JUGADOR = [
      '#ef4444',
      '#3b82f6',
      '#22c55e',
      '#eab308',
    ];

    return partida.snapshotJugadores.jugadores.map((jugador, index) => ({
      nombreJugador: jugador.username,
      esTurno: jugadorActual?.username === jugador.username,
      iconoJugador: partida.partidaJugadores.find(
        (j) => j.nombre === jugador.username
      )?.iconoActualField,
      colorFichas: COLORES_JUGADOR[index % COLORES_JUGADOR.length],
    }));
  }, [partida]);

  const tablero = partida?.snapshotTablero ?? null;

  useEffect(() => {
    if (!partida || !miJugador?.mano || miJugador.mano.length === 0) {
      setMazoEnMano([]);
      return;
    }

    let cancelado = false;

    const cargarMazoEnMano = async () => {
      try {
        const todasLasCartas = await CardsService.getAllCards();
        if (cancelado) return;

        const cartasEnMano = miJugador.mano
          .map((nombreCarta) =>
            todasLasCartas.find((c) => c.nombre === nombreCarta)
          )
          .filter((c): c is Carta => c !== undefined);

        setMazoEnMano(cartasEnMano);
      } catch {
        if (!cancelado) {
          setMazoEnMano([]);
        }
      }
    };

    cargarMazoEnMano();

    return () => {
      cancelado = true;
    };
  }, [partida, miJugador]);

  const tirarDado = useCallback(async (): Promise<throwDiceResponse | null> => {
    if (!partidaId || !username || cargandoAccion) return null;

    try {
      setCargandoAccion(true);
      setErrorPartida(null);

      const data = await MatchesService.tirarDado(partidaId, username);

      setPartida(data.partida);
      setUltimaTirada(data.tirada);
      setTiradaExtra(data.tiradaExtra ?? null);
      setMovimientos(data.movimientos);

      return data;
    } catch (error) {
      setErrorPartida(
        error instanceof Error ? error.message : "Error al tirar el dado"
      );
      return null;
    } finally {
      setCargandoAccion(false);
    }
  }, [partidaId, username, cargandoAccion]);

  const moverFicha = useCallback(
  async (
    pawnId: number,
    posicionFinal: number,
    pasosRestantes = 0
  ): Promise<Partida | null> => {
    if (!partidaId || !username || cargandoAccion) return null;

    try {
      setCargandoAccion(true);
      setErrorPartida(null);

      const partidaActualizada = await MatchesService.moverFicha(
        partidaId,
        username,
        pawnId,
        posicionFinal,
        pasosRestantes
      );

      setPartida(partidaActualizada);

      const casillaDestino =
        partidaActualizada.snapshotTablero?.casillas?.[posicionFinal];

      const sigueEnBifurcacion =
        pasosRestantes > 0 && casillaDestino?.tipo === "Bifurcacion";

      if (!sigueEnBifurcacion) {
        setMovimientos([]);
        setUltimaTirada(null);
        setTiradaExtra(null);

      }

      return partidaActualizada;
    } catch (error) {
      setErrorPartida(
        error instanceof Error ? error.message : "Error al mover la ficha"
      );
      return null;
    } finally {
      setCargandoAccion(false);
    }
  },
  [partidaId, username, cargandoAccion]
  );

  const jugarCarta = useCallback(
    async (
      cartaId: string,
      who?: string | number,
      inicio?: number,
      fin?: number
    ): Promise<Partida | null> => {
      if (!partidaId || !username || cargandoAccion) return null;

      try {
        setCargandoAccion(true);
        setErrorPartida(null);

        const partidaActualizada = await MatchesService.jugarCarta(
          partidaId,
          username,
          cartaId,
          who,
          inicio,
          fin
        );

        setPartida(partidaActualizada);

        return partidaActualizada;
      } catch (error) {
        setErrorPartida(
          error instanceof Error ? error.message : "Error al jugar la carta"
        );
        return null;
      } finally {
        setCargandoAccion(false);
      }
    },
    [partidaId, username, cargandoAccion]
  );

  const enviarMensajeChat = useCallback(
    async (mensaje: string): Promise<ChatMessage[] | null> => {
      if (!partidaId || !username) return null;

      try {
        const data = await MatchesService.enviarMensajeChat(
          partidaId,
          username,
          mensaje
        );
        return data.chat;
      } catch (error) {
        setErrorPartida(
          error instanceof Error ? error.message : "Error al enviar mensaje"
        );
        return null;
      }
    },
    [partidaId, username]
  );

  const obtenerChat = useCallback(async (): Promise<ChatMessage[] | null> => {
    if (!partidaId || !username) return null;

    try {
      const data = await MatchesService.obtenerChatPartida(
        partidaId,
        username
      );
      return data.chat;
    } catch (error) {
      setErrorPartida(
        error instanceof Error ? error.message : "Error al obtener el chat"
      );
      return null;
    }
  }, [partidaId, username]);

  const limpiarErrorPartida = useCallback(() => {
    setErrorPartida(null);
  }, []);

  const limpiarMovimientos = useCallback(() => {
    setMovimientos([]);
  }, []);

  return {
    partida,
    setPartida,

    jugadores,
    tablero,
    miJugador,
    jugadorTurno,
    tuTurno,
    mazoEnMano,

    ultimaTirada,
    tiradaExtra,
    movimientos,

    cargandoPartida,
    cargandoAccion,
    errorPartida,

    cargarPartida,
    tirarDado,
    moverFicha,
    jugarCarta,
    enviarMensajeChat,
    obtenerChat,

    limpiarErrorPartida,
    limpiarMovimientos,
  };
}