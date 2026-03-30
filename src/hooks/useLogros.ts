'use client';

import { useEffect, useState } from 'react';
import { LogroUI } from '@/types/logro';
import { LogrosService } from '@/services/logros.service';

export const useLogros = (email: string) => {
  const [logros, setLogros] = useState<LogroUI[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!email) return;

    const fetchLogros = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const logrosList = await LogrosService.getLogros(email);
        setLogros(logrosList);
      } catch (err: any) {
        setError(err.message || 'Error al cargar los logros');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLogros();
  }, [email]);

  return {
    logros,
    isLoading,
    error,
  };
};
