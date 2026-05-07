"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { MatchesService } from "../services/matches.service";
import { MazoService } from "../services/mazos.service";
import { Carta } from "@/types/carta";
import {
  Partida,
  throwDiceResponse,
  movimientosResponse,
} from "../types/partida";

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

    return partida.snapshotJugadores.jugadores.map((jugador) => ({
      nombreJugador: jugador.username,
      esTurno: jugadorActual?.username === jugador.username,
      iconoJugador: partida.partidaJugadores.find(
        (j) => j.nombre === jugador.username
      )?.iconoActualField,
    }));
  }, [partida]);

  const tablero = partida?.snapshotTablero ?? null;

  useEffect(() => {
    if (!partida || !miJugador?.mazo) {
      setMazoEnMano([]);
      return;
    }

    let cancelado = false;

    const cargarMazoEnMano = async () => {
      try {
        const mazo: Carta[] = [];

        if (cancelado) return;

        if (!mazo) {
          setMazoEnMano([]);
          return;
        }
        setMazoEnMano(mazo);
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
        setMovimientos([]);
        setUltimaTirada(null);
        setTiradaExtra(null);

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

    limpiarErrorPartida,
    limpiarMovimientos,
  };
}