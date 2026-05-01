'use client';

import { useEffect, useState, useCallback } from 'react';
import { Amigo } from '@/types/amigo';
import { AmigosService } from '@/services/amigos.service';

export const useAmigos = (email: string) => {
  const [amigos, setAmigos] = useState<Amigo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAmigos = useCallback(async () => {
    try {
      const list = await AmigosService.getAmigos(email);
      setAmigos(list);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [email]);

  useEffect(() => {
    if (!email) return;
    
    fetchAmigos();

    // Polling cada 15 segundos para refrescar la lista automáticamente
    const interval = setInterval(fetchAmigos, 15000);
    
    return () => clearInterval(interval);
  }, [email, fetchAmigos]);

  return { amigos, isLoading, error, refresh: fetchAmigos };
};