import { Mazo } from '@/types/mazo';
import Carta from '@/types/carta';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

// Interfaces para coincidir exactamente con lo que devuelve Prisma en el Backend
interface CartaBackend {
  nombre: string;
  tipo: string;
  calidad: string; // En el back es 'calidad', en el front 'rareza'
  descripcion: string;
  efecto?: string;
}

interface BarajaCartaBackend {
  cartaNombre: string;
  carta: CartaBackend;
}

interface BarajaBackend {
  nombre: string;
  usuarioEmail: string;
  barajaCartas: BarajaCartaBackend[];
  usadaEn: { partidaID: string }[];
}

const generarUrlImagen = (nombre: string): string => {
  return `/Cartas/${nombre.replace(/\s+/g, '_').toLowerCase()}.png`;
};

// Función de mapeo para transformar lo que viene del servidor a lo que usa tu UI
const mapearMazo = (mazoCrudo: BarajaBackend): Mazo => {
  const cartasCompletas: Carta[] = mazoCrudo.barajaCartas.map((bc) => ({
    nombre: bc.carta.nombre,
    tipo: bc.carta.tipo,
    rareza: bc.carta.calidad, 
    descripcion: bc.carta.descripcion,
    efecto: bc.carta.efecto || '',
    imagen: generarUrlImagen(bc.carta.nombre),
  }));

  return {
    id: mazoCrudo.nombre, // Usamos el nombre como ID único según tu esquema
    deck_name: mazoCrudo.nombre,
    cards: cartasCompletas,
    is_in_use: mazoCrudo.usadaEn && mazoCrudo.usadaEn.length > 0,
  };
};

export const MazoService = {
  // GET /api/users/:email/decks
  getMazos: async (email: string): Promise<Mazo[]> => {
    const res = await fetch(`${API_URL}/users/${email}/decks`, {
      credentials: 'include',
    });
    
    if (!res.ok) throw new Error('Error al obtener los mazos');

    const data = await res.json(); 
    // CORRECCIÓN: Accedemos a la propiedad .decks que envía tu backend
    const mazosCrudos: BarajaBackend[] = data.decks || [];
    return mazosCrudos.map(mapearMazo);
  },

  getMazoById: async (email: string, deckId: string): Promise<Mazo> => {
    // Obtenemos todos y buscamos el que coincida
    const mazos = await MazoService.getMazos(email);
    const mazo = mazos.find(m => m.id === deckId);
  
    if (!mazo) throw new Error('Mazo no encontrado');
    return mazo;
  },

  // DELETE /api/users/:email/decks/:deck-id
  deleteMazo: async (email: string, id: string): Promise<boolean> => {
    const response = await fetch(`${API_URL}/users/${email}/decks/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      // Captura el mensaje "No se puede eliminar la baraja porque esta siendo usada..."
      throw new Error(err.error || 'No se pudo eliminar el mazo');
    }
    return true;
  },

  updateMazo: async (email: string, id: string, name: string, cards: Carta[]) => {
    // Si el nombre (id) ha cambiado, el backend lo tratará como uno nuevo.
    // Una estrategia común es borrar el antiguo y crear el nuevo si el nombre cambia,
    // o simplemente enviar los nuevos datos si tu backend soporta PUT /decks/:id
    
    // Por ahora, para que tu front funcione, implementamos la lógica de borrado + creación
    // que es la más segura con tu esquema actual de "entidad débil":
    if (id !== name) {
      await MazoService.deleteMazo(email, id);
    }
    return await MazoService.createMazo(email, name, cards);
  },

  // POST /api/users/:email/decks
  createMazo: async (email: string, name: string, cards: Carta[]) => {
    const response = await fetch(`${API_URL}/users/${email}/decks`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        nombre: name, 
        cartas: cards 
      }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error || 'Error al crear el mazo');
    }
    return true;
  }
};