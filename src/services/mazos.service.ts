// src/services/decks.service.ts
import { Deck } from '../types/mazo';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const DecksService = {

  getDecks: async (email: string): Promise<Deck[]> => {
    // 1. Simulamos el tiempo de carga de internet (medio segundo)
    await new Promise(resolve => setTimeout(resolve, 500));

    // 2. Devolvemos unos datos de prueba (Mocks) para que puedas ver tu diseño
    return [
      { id: '1', deck_name: 'Mazo de Fuego', is_in_use: false, cards: ['Bola de Fuego', 'Dragón', 'Escudo'] },
      { id: '2', deck_name: 'Mazo Tóxico', is_in_use: true, cards: ['Veneno', 'Serpiente', 'Trampa'] }
    ];

    /* --- GUARDA EL CÓDIGO REAL COMENTADO PARA EL FUTURO ---
    const response = await fetch(`${API_URL}/users/${email}/decks`, {
      // credentials: 'include' 
    });
    
    // Es buena práctica comprobar si es OK antes del .json() para evitar el error del DOCTYPE
    if (!response.ok) {
      throw new Error('Error al obtener los mazos o API no encontrada');
    }
    
    const data = await response.json();
    return data as Deck[];
    -------------------------------------------------------- */
  },

  getDeckCards: async (email: string, deckId: string): Promise<any> => {
    const response = await fetch(`${API_URL}/users/${email}/decks/${deckId}/cards`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Error al obtener las cartas del mazo');
    return data;
  },

  createDeck: async (email: string, deckName: string, cards: string[]): Promise<Deck> => {
    const response = await fetch(`${API_URL}/users/${email}/decks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ deck_name: deckName, cards }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Error al crear el mazo (quizás hay cartas ilegales)');
    return data as Deck;
  },

  updateDeck: async (email: string, deckId: string, deckName: string, cards: string[]): Promise<Deck> => {
    const response = await fetch(`${API_URL}/users/${email}/decks/${deckId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ deck_name: deckName, cards }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Error al modificar el mazo');
    return data as Deck;
  },

  deleteDeck: async (email: string, deckId: string): Promise<void> => {
    const response = await fetch(`${API_URL}/users/${email}/decks/${deckId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || 'Error al borrar el mazo');
    }
  }
};