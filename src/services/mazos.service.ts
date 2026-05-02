import { Mazo } from '@/types/mazo';
import Carta from '@/types/carta';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

interface CartaBackend {
  nombre: string;
  tipo: string;
  calidad: string;
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

const mapearMazo = (mazoCrudo: BarajaBackend): Mazo => {
  const cartasCompletas: Carta[] = mazoCrudo.barajaCartas.map((bc) => {
    return {
      nombre: bc.carta.nombre,
      tipo: bc.carta.tipo,
      rareza: bc.carta.calidad,
      descripcion: bc.carta.descripcion,
      efecto: bc.carta.efecto || '',
      imagen: generarUrlImagen(bc.carta.nombre),
    };
  });

  return {
    id: mazoCrudo.nombre,
    deck_name: mazoCrudo.nombre,
    cards: cartasCompletas,
    is_in_use: mazoCrudo.usadaEn && mazoCrudo.usadaEn.length > 0,
  };
};

export const MazoService = {
  // Obtener todos los mazos
  getMazos: async (email: string): Promise<Mazo[]> => {
    const res = await fetch(`${API_URL}/users/${email}/decks`, {
      credentials: 'include',
    });
    
    if (!res.ok) throw new Error('Error al obtener los mazos');

    const mazosCrudos: BarajaBackend[] = await res.json();
    return mazosCrudos.map(mapearMazo);
  },

  // Obtener un mazo por ID (para editar)
  getMazoById: async (email: string, deckId: string): Promise<Mazo> => {
    const res = await fetch(`${API_URL}/users/${email}/decks/${deckId}`, {
      credentials: 'include',
    });

    if (!res.ok) throw new Error('Error al obtener el mazo');

    const mazoCrudo: BarajaBackend = await res.json();
    return mapearMazo(mazoCrudo);
  },

  // Crear, Actualizar, Borrar y Equipar
  createMazo: async (email: string, name: string, cards: Carta[]) => {
    console.log("API: Creando mazo", name, "para el usuario", email, "con", cards.length, "cartas");
    return true;
  },

  updateMazo: async (email: string, id: string, name: string, cards: Carta[]) => {
    console.log("API: Actualizando mazo", id, "a nombre", name, "para", email, "con", cards.length, "cartas");
    return true;
  },

  deleteMazo: async (email: string, id: string) => {
    console.log("API: Borrando mazo", id, "del usuario", email);
    return true;
  },

  setMainMazo: async (email: string, id: string) => {
    console.log("API: Equipando mazo", id, "para el usuario", email);
    return true;
  }
};