'use client';
import { useState, useEffect } from 'react';
import { MazoService } from '@/services/mazos.service';
import { Mazo } from '@/types/mazo';

export const useMazos = (email: string) => {
  const [decks, setDecks] = useState<Mazo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDecks = async () => {
    setIsLoading(true);
    const data = await MazoService.getMazos(email);
    setDecks(data);
    setIsLoading(false);
  };

 const handleDelete = async (id: string) => {

  try {
    await MazoService.deleteMazo(email, id);
    setDecks(prev => prev.filter(d => d.id !== id));
  } catch (err: any) {
    alert("Error al borrar el mazo en el servidor");
  }
};

  const handleSelect = async (id: string) => {
    await MazoService.setMainMazo(email, id);
    setDecks(prev => prev.map(d => ({ ...d, is_in_use: d.id === id })));
  };

  useEffect(() => { fetchDecks(); }, [email]);

  return { decks, isLoading, handleDelete, handleSelect };
};