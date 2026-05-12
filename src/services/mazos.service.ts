import { Mazo } from '@/types/mazo';
import { Carta } from '@/types/carta';

// Mantenemos el 3000 para las llamadas a la API
const API_URL = 'http://localhost:3000/api'; 

const generarUrlImagen = (nombre: string): string => {
  const nombreArchivo = nombre.toLowerCase().replace(/\s+/g, '_');
  return `/Cartas/${nombreArchivo}.png`;
};


const CALIDAD_MAP: Record<string, string> = {
  'comun': 'Comun',
  'común': 'Comun',
  'rara': 'Rara',
  'epica': 'Epica',
  'épica': 'Epica',
  'legendaria': 'Legendaria',
};
const TIPO_MAP: Record<string, string> = {
  'ofensiva': 'Ofensiva',
  'defensiva': 'Defensiva',
  'entorno': 'Entorno',
};

const normalizarCarta = (c: Carta) => {
  const normalizedCalidad = String(c.calidad || '').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
  const normalizedTipo = String(c.tipo || '').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();

  return {
    nombre: c.nombre || '',
    calidad: CALIDAD_MAP[normalizedCalidad] ?? c.calidad,
    tipo: TIPO_MAP[normalizedTipo] ?? c.tipo,
    descripcion: c.descripcion || '' // Muy importante: si es undefined/null, TypeBox falla al validar el array de cartas y da 'required property cartas'
  };
};

export const MazoService = {
  // GET: Obtener mazos
  getMazos: async (email: string): Promise<Mazo[]> => {
    const res = await fetch(`${API_URL}/users/${encodeURIComponent(email)}/decks`, {
      credentials: 'include',
    });
    
    if (!res.ok) throw new Error('Error al obtener los mazos');

    const data = await res.json(); 
    
    // El backend devuelve el objeto { decks: [...] } y dentro de cada mazo el array .cartas
    return (data.decks || []).map((m: any) => ({
      id: m.nombre,
      nombre: m.nombre,
      is_in_use: false, 
      cartas: (m.cartas || []).map((c: any) => ({
        ...c,
        imagen: generarUrlImagen(c.nombre),
        efecto: ''
      }))
    }));
  },

  // DELETE /api/users/:email/decks/:deckId
  deleteMazo: async (email: string, id: string): Promise<boolean> => {
    const emailSafe = encodeURIComponent(email);
    const idSafe = encodeURIComponent(id);

    const url = `${API_URL}/users/${emailSafe}/decks/${idSafe}`;
    const response = await fetch(url, {
      method: 'DELETE',
      credentials: 'include',
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error || 'Error al eliminar: Probablemente el mazo está en uso');
    }
    return true;
  },

  // POST: Crear mazo
  createMazo: async (email: string, nombre: string, cartas: Carta[]) => {
    const payload = { 
      nombre: nombre, 
      cartas: cartas.map(normalizarCarta)
    };  

    const response = await fetch(`${API_URL}/users/${encodeURIComponent(email)}/decks`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error || 'Error al crear el mazo en el servidor');
    }
    return true;
  },

  getMazoById: async (email: string, deckId: string): Promise<Mazo> => {
    const mazos = await MazoService.getMazos(email);
    const mazo = mazos.find(m => m.id === deckId);
    if (!mazo) throw new Error('Mazo no encontrado');
    return mazo;
  },

  updateMazo: async (email: string, id: string, name: string, newCards: Carta[]) => {
    const payload = {
      nombre: name,
      cartas: newCards.map(normalizarCarta)
    };

    const url = `${API_URL}/users/${encodeURIComponent(email)}/decks/${encodeURIComponent(id)}`;
    const response = await fetch(url, {
      method: 'PUT',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error || 'Error al actualizar el mazo');
    }
    return true;
  }
};  