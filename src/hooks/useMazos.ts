'use client';

import { useState, useEffect } from 'react';
import { MazoService } from '@/services/mazos.service';
import { Mazo } from '@/types/mazo';

export const useMazos = (email: string) => {
  const [decks, setDecks] = useState<Mazo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDecks = async () => {
    if (!email) return;
    try {
      setIsLoading(true);
      const data = await MazoService.getMazos(email);
      setDecks(data);
    } catch (err) {
      console.error("Error cargando mazos:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await MazoService.deleteMazo(email, id);
      // Tras borrar con éxito en el back, actualizamos la lista local
      setDecks(prev => prev.filter(d => d.id !== id));
    } catch (err: unknown) {
      // El backend lanza error si el mazo está en una partida activa
      alert((err as Error).message);
    }
  };

  useEffect(() => {
    fetchDecks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  return {
    decks,
    isLoading,
    handleDelete,
    refresh: fetchDecks
  };
};