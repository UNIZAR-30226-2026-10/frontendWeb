import { Mazo } from '@/types/mazo';
import { Carta } from '@/types/carta';

// Mantenemos el 3000 para las llamadas a la API
const API_URL = 'http://localhost:3000/api'; 

const generarUrlImagen = (nombre: string): string => {
  const nombreArchivo = nombre.toLowerCase().replace(/\s+/g, '_');
  return `/Cartas/${nombreArchivo}.png`;
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
      cartas: cartas.map(c => ({
        nombre: c.nombre, 
        // Limpiamos ENUMS (Quitar tildes y Capitalizar: Épica -> Epica)
        calidad: c.calidad.normalize("NFD").replace(/[\u0300-\u036f]/g, "").charAt(0).toUpperCase() + c.calidad.slice(1).toLowerCase(),
        tipo: c.tipo.charAt(0).toUpperCase() + c.tipo.slice(1).toLowerCase(),
        descripcion: c.descripcion
      }))
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
    const currentMazo = await MazoService.getMazoById(email, id);
    const currentCards = currentMazo.cartas;

    const currentCount: Record<string, number> = {};
    const currentMap: Record<string, Carta> = {};
    currentCards.forEach(c => {
      currentCount[c.nombre] = (currentCount[c.nombre] || 0) + 1;
      currentMap[c.nombre] = c;
    });

    const newCount: Record<string, number> = {};
    const newMap: Record<string, Carta> = {};
    newCards.forEach(c => {
      newCount[c.nombre] = (newCount[c.nombre] || 0) + 1;
      newMap[c.nombre] = c;
    });

    const format = (c: Carta) => ({
      nombre: c.nombre,
      calidad: c.calidad.normalize("NFD").replace(/[\u0300-\u036f]/g, "").charAt(0).toUpperCase() + c.calidad.slice(1).toLowerCase(),
      tipo: c.tipo.charAt(0).toUpperCase() + c.tipo.slice(1).toLowerCase(),
      descripcion: c.descripcion
    });

    const cartaAñadir: any[] = [];
    const cartaEliminar: any[] = [];

    for (const nameKey in newCount) {
      const diff = newCount[nameKey] - (currentCount[nameKey] || 0);
      for (let i = 0; i < diff; i++) {
        cartaAñadir.push(format(newMap[nameKey]));
      }
    }

    for (const nameKey in currentCount) {
      const diff = currentCount[nameKey] - (newCount[nameKey] || 0);
      for (let i = 0; i < diff; i++) {
        cartaEliminar.push(format(currentMap[nameKey]));
      }
    }

    const payload = {
      nombre: name,
      cartaAñadir,
      cartaEliminar
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