'use client';

import { useEffect, useState, useCallback } from 'react';
import { Amigo } from '@/types/amigo';
import { AmigosService } from '@/services/amigos.service';

export const useAmigos = (email: string) => {
  const [amigos, setAmigos] = useState<Amigo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);
  const [isRemoving, setIsRemoving] = useState(false);

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

  const agregarAmigo = useCallback(async (friendUsername: string): Promise<boolean> => {
    if (!email || !friendUsername.trim()) return false;
    setIsAdding(true);
    setAddError(null);
    try {
      await AmigosService.addAmigo(email, friendUsername.trim());
      await fetchAmigos(); // Refresca la lista inmediatamente
      return true;
    } catch (err: any) {
      setAddError(err.message || 'No se pudo añadir al amigo');
      return false;
    } finally {
      setIsAdding(false);
    }
  }, [email, fetchAmigos]);

  const eliminarAmigo = useCallback(async (friendUsername: string): Promise<boolean> => {
    if (!email || !friendUsername.trim()) return false;
    setIsRemoving(true);
    try {
      await AmigosService.removeAmigo(email, friendUsername.trim());
      await fetchAmigos(); // Refresca la lista inmediatamente
      return true;
    } catch (err: any) {
      return false;
    } finally {
      setIsRemoving(false);
    }
  }, [email, fetchAmigos]);

  return { amigos, isLoading, error, refresh: fetchAmigos, agregarAmigo, isAdding, addError, setAddError, eliminarAmigo, isRemoving };
};