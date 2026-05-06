"use client";

import { useCallback, useState } from "react";
import { MatchesService } from "../services/matches.service";
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

    ultimaTirada,
    tiradaExtra,
    movimientos,

    tirarDado,
    moverFicha,
    jugarCarta,

    cargandoAccion,
    errorPartida,
    limpiarErrorPartida,
    limpiarMovimientos,
  };
}