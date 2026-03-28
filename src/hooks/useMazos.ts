// src/hooks/useDecks.ts
'use client';
import { useState, useEffect } from 'react';
import { DecksService } from '@/services/mazos.service';
import { Deck } from '@/types/mazo';

export const useDecks = (email: string) => {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!email) return;

    const fetchDecks = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await DecksService.getDecks(email);
        setDecks(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDecks();
  }, [email]);

  const handleDeleteDeck = async (deckId: string) => {
    if (!window.confirm("¿Seguro que quieres borrar este mazo?")) return;

    try {
      // Usamos el servicio para borrar
      await DecksService.deleteDeck(email, deckId);
      
      // Si el back responde bien, lo quitamos de la pantalla
      setDecks(prevDecks => prevDecks.filter(deck => deck.id !== deckId));
    } catch (err: any) {
      alert(err.message);
    }
  };

  return {
    decks,
    isLoading,
    error,
    handleDeleteDeck
  };
};