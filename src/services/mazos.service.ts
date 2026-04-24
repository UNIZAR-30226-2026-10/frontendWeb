import { Mazo } from '@/types/mazo';
import Carta from '@/types/carta';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

const generarUrlImagen = (nombre: string): string => {
  return `/Cartas/${nombre.replace(/\s+/g, '_').toLowerCase()}.png`;
};

const agregarImagenesACartas = (cards: Omit<Carta, 'imagen'>[]): Carta[] => {
  return cards.map(card => ({
    ...card,
    imagen: generarUrlImagen(card.nombre)
  }));
};

export const MazoService = {
  // Obtener todos los mazos
  getMazos: async (email: string): Promise<Mazo[]> => {
    const res = await fetch(`${API_URL}/users/${email}/decks`, {
      credentials: 'include',
    });
    const mazos = await res.json();
    
    return mazos.map((mazo: any) => ({
      ...mazo,
      cards: agregarImagenesACartas(mazo.cards)
    }));
  },

  // Obtener un mazo por ID (para editar)
  getMazoById: async (email: string, deckId: string): Promise<Mazo> => {
    const res = await fetch(`${API_URL}/users/${email}/decks/${deckId}`, {
      credentials: 'include',
    });
    const mazo = await res.json();
    
    return {
      ...mazo,
      cards: agregarImagenesACartas(mazo.cards)
    };
  },

  // Crear, Actualizar, Borrar y Equipar
  createMazo: async (email: string, name: string, cards: Carta[]) => {
    const cardsWithoutImage = cards.map(({ imagen, ...rest }) => rest);
    console.log("API: Creando mazo", name);
    return true;
  },

  updateMazo: async (email: string, id: string, name: string, cards: Carta[]) => {
    const cardsWithoutImage = cards.map(({ imagen, ...rest }) => rest);
    console.log("API: Actualizando mazo", id);
    return true;
  },

  deleteMazo: async (email: string, id: string) => {
    console.log("API: Borrando mazo", id);
    return true;
  },

  setMainMazo: async (email: string, id: string) => {
    console.log("API: Equipando mazo", id);
    return true;
  }
};