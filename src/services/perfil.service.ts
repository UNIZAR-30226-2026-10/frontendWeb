import { PerfilUI } from '@/types/perfil';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const generarUrlImagen = (nombre: string): string => {
  if (!nombre || nombre.toLowerCase() === 'null' || nombre === '') return '/placeholder_cosmetico.png';
  return `/${nombre.toLowerCase().replace(/\s+/g, '_')}.png`;
};

const normalizarNombre = (valor: any): string => {
  if (typeof valor === 'string') return valor;
  if (typeof valor === 'object' && valor !== null && valor.nombre) return valor.nombre;
  return '';
};

export const PerfilService = {
  getPerfil: async (email: string): Promise<PerfilUI> => {
    const [perfilRes, iconsRes, pawnsRes, snakesRes, stairsRes] = await Promise.all([
      fetch(`${API_URL}/users/${email}/profile`, { method: 'GET', credentials: 'include' }),
      fetch(`${API_URL}/users/${email}/icons`, { method: 'GET', credentials: 'include' }),
      fetch(`${API_URL}/users/${email}/pawns`, { method: 'GET', credentials: 'include' }),
      fetch(`${API_URL}/users/${email}/snakes`, { method: 'GET', credentials: 'include' }),
      fetch(`${API_URL}/users/${email}/stairs`, { method: 'GET', credentials: 'include' })
    ]);

    if (!perfilRes.ok) {
      const err = await perfilRes.json().catch(() => ({}));
      throw new Error(err.error || 'Error al obtener el perfil');
    }

    const data = await perfilRes.json();
    const iconsData = await iconsRes.json().catch(() => ({ iconos: [] }));
    const pawnsData = await pawnsRes.json().catch(() => ({ fichas: [] }));
    const snakesData = await snakesRes.json().catch(() => ({ serpientes: [] }));
    const stairsData = await stairsRes.json().catch(() => ({ escaleras: [] }));

    const todosMisCosmeticos = [
      ...iconsData.iconos.map((item: any) => {
        const nombre = typeof item === 'string' ? item : item.nombre;
        return { id: nombre, tipo: 'Icono', nombre, imagen: generarUrlImagen(nombre) };
      }),
      ...pawnsData.fichas.map((item: any) => {
        const nombre = typeof item === 'string' ? item : item.nombre;
        return { id: nombre, tipo: 'Skin_Ficha', nombre, imagen: generarUrlImagen(nombre) };
      }),
      ...snakesData.serpientes.map((item: any) => {
        const nombre = typeof item === 'string' ? item : item.nombre;
        return { id: nombre, tipo: 'Skin_Serpiente', nombre, imagen: generarUrlImagen(nombre) };
      }),
      ...stairsData.escaleras.map((item: any) => {
        const nombre = typeof item === 'string' ? item : item.nombre;
        return { id: nombre, tipo: 'Skin_Escalera', nombre, imagen: generarUrlImagen(nombre) };
      })
    ];

    return {
      username: data.nombre,
      fotoPerfil: normalizarNombre(data.iconoActual),
      victorias: data.victorias,
      derrotas: data.derrotas,
      sep: data.SEP,
      cosmeticos: [
        { id: 'ficha_actual', tipo: 'Skin_Ficha', nombre: normalizarNombre(data.FichaActual), imagen: generarUrlImagen(normalizarNombre(data.FichaActual)) },
        { id: 'serpiente_actual', tipo: 'Skin_Serpiente', nombre: normalizarNombre(data.SerpienteActual), imagen: generarUrlImagen(normalizarNombre(data.SerpienteActual)) },
        { id: 'escalera_actual', tipo: 'Skin_Escalera', nombre: normalizarNombre(data.EscaleraActual), imagen: generarUrlImagen(normalizarNombre(data.EscaleraActual)) }
      ],
      todosMisCosmeticos 
    };
  },

  equiparCosmetico: async (email: string, item: { tipo: string, nombre: string }): Promise<boolean> => {
    let endpoint = '';
    let bodyData = {};

    switch (item.tipo) {
      case 'Icono':
        endpoint = 'icon';
        bodyData = { icon: item.nombre };
        break;
      case 'Skin_Ficha':
        endpoint = 'pawn';
        bodyData = { pawn: item.nombre };
        break;
      case 'Skin_Serpiente':
        endpoint = 'snake';
        bodyData = { snake: item.nombre };
        break;
      case 'Skin_Escalera':
        endpoint = 'stair';
        bodyData = { stair: item.nombre };
        break;
      default:
        throw new Error(`Tipo de cosmético desconocido: ${item.tipo}`);
    }

    const response = await fetch(`${API_URL}/users/${email}/${endpoint}`, {
      method: 'PUT',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bodyData)
    });
    
    if (!response.ok) {
      throw new Error(`Error al equipar el cosmético: ${item.tipo}`);
    }

    return true;
  },

  cambiarUsername: async (email: string, nuevoNombre: string): Promise<boolean> => {
  const response = await fetch(`${API_URL}/users/${email}/username`, {
    method: 'PUT',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: nuevoNombre })
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error || 'Error al cambiar el nombre');
  }

  return true;
}
};