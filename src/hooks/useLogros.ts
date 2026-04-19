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

        // Ajustamos las keys para que coincidan con la respuesta real del servidor
        switch (l.tipo) {
          case 'Victorias': progreso = stats.victorias || 0; break;
          case 'Partidas': progreso = stats.PartidasJugadas || 0; break;
          case 'SEP': progreso = stats.SEP || 0; break;
          case 'CartasJugadas': progreso = stats.CartasJugadas || 0; break;
          default: progreso = 0;
        }

        return {
          id: l.id || '',
          nombreLogro: l.nombre || 'Logro Desconocido',
          descripcionLogro: l.descripcion || '',
          progresoLogro: progreso,
          metaLogro: l.requisito || 0,
          recompensaLogro: l.recompensa || 'Sin recompensa',
          // Ahora TypeScript ya sabe qué es LogrosCompletados
          completado: stats.LogrosCompletados?.includes(l.nombre || '') || false
        };
      });

      setLogros(logrosProcesados);
    } catch (err: unknown) {
      setError((err as Error).message || 'Error al cargar los logros');
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