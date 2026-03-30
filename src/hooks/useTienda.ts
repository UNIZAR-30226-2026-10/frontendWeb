'use client';

import { useEffect, useState } from 'react';
import { TiendaUI } from '@/types/tienda';
import { TiendaService } from '@/services/tienda.service';

export const useTienda = (email: string) => {
  const [tienda, setTienda] = useState<TiendaUI | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!email) return;

    const fetchTienda = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const tiendaData = await TiendaService.getTienda(email);
        setTienda(tiendaData);
      } catch (err: any) {
        setError(err.message || 'Error al cargar la tienda');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTienda();
  }, [email]);

  return {
    tienda,
    isLoading,
    error,
  };
};
