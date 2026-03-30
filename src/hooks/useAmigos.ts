'use client';

import { useEffect, useState } from 'react';
import { Amigo } from '@/types/amigo';
import { AmigosService } from '@/services/amigos.service';

export const useAmigos = (email: string) => {
  const [amigos, setAmigos] = useState<Amigo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!email) return;

    const fetchAmigos = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const amigosList = await AmigosService.getAmigos(email);
        setAmigos(amigosList);
      } catch (err: any) {
        setError(err.message || 'Error al cargar los amigos');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAmigos();
  }, [email]);

  return {
    amigos,
    isLoading,
    error,
  };
};
