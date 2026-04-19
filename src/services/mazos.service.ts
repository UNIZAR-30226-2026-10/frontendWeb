import { Mazo, Carta } from '@/types/mazo';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const MazoService = {
  // Obtener todos los mazos
  getMazos: async (email: string): Promise<Mazo[]> => {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulación
    return [
      { id: '1', deck_name: 'Mazo Inicial', is_in_use: true, cards: ['Fuego', 'Rápido'] },
      { id: '2', deck_name: 'Táctica de Serpiente', is_in_use: false, cards: ['Veneno', 'Salto'] }
    ];
    /* REAL: 
    const res = await fetch(`${API_URL}/users/${email}/decks`);
    return res.json(); 
    */
  },

  // Obtener un mazo por ID (para editar)
  getMazoById: async (email: string, deckId: string): Promise<Mazo> => {
    // Simulación: En la realidad buscarías el mazo específico
    return { id: deckId, deck_name: 'Mazo Recuperado', is_in_use: false, cards: ['Fuego'] };
  },

  // Crear, Actualizar, Borrar y Equipar
  createMazo: async (email: string, name: string, cards: string[]) => {
    console.log("API: Creando mazo", name);
    return true;
  },

  updateMazo: async (email: string, id: string, name: string, cards: string[]) => {
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