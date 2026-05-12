'use client';

import { useEffect, useState } from 'react';
import { LogroUI } from '@/types/logro';
import { LogrosService } from '@/services/logros.service';

export const useLogros = (email: string) => {
  const [logros, setLogros] = useState<LogroUI[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLogros = async () => {
    try {
      setIsLoading(true);
      const [stats, globalLogros] = await Promise.all([
        LogrosService.getUserStats(email),
        LogrosService.getGlobalAchievements()
      ]);

      const logrosProcesados: LogroUI[] = globalLogros.map(l => {
        let progreso = 0;

        // El backend usa Tipo_Logro enum (p.ej: 'Victorias', 'SEP', 'Partidas')
        switch (l.tipo) {
          case 'Victorias': progreso = stats.victorias || 0; break;
          case 'Partidas': progreso = stats.PartidasJugadas || 0; break;
          case 'SEP': progreso = stats.SEP || 0; break;
          case 'CartasJugadas': progreso = stats.CartasJugadas || 0; break;
          case 'LogrosDesbloqueados': progreso = stats.LogrosCompletados?.length || 0; break;
          case 'CartasColeccionadas': progreso = stats.CartasTotales || 0; break;
          default: progreso = 0;
        }

        // Construimos la descripción de la recompensa
        const recompensaStr = l.recompensaMonetaria 
          ? `${l.recompensaMonetaria} SEP` 
          : (l.cartaID ? `Carta: ${l.cartaID}` : 'Reconocimiento');

        return {
          id: l.nombre || '', // Usamos 'nombre' como ID único según tu Prisma
          nombreLogro: l.nombre || 'Logro Desconocido',
          descripcionLogro: l.descripcion || '',
          progresoLogro: progreso,
          metaLogro: l.requisito || 0,
          recompensaLogro: recompensaStr,
          // Comprobamos si el nombre está en la lista de completados del usuario
          completado: stats.LogrosCompletados?.includes(l.nombre || '') || false
        };
      });

      setLogros(logrosProcesados);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setIsLoading(false);
    }
  };

  const reclamar = async (id: string) => {
    try {
      await LogrosService.reclamarLogro(email, id);
      await fetchLogros(); // Refrescamos la lista
      return true;
    } catch (err: unknown) {
      alert((err as Error).message);
      return false;
    }
  };

  useEffect(() => {
    if (email) fetchLogros();
  }, [email]);

  return { logros, isLoading, error, reclamar };
};