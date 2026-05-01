import { PerfilUI } from '@/types/perfil';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

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
      ...iconsData.iconos.map((nombre: string) => ({ id: nombre, tipo: 'Icono', nombre })),
      ...pawnsData.fichas.map((nombre: string) => ({ id: nombre, tipo: 'Ficha', nombre })),
      ...snakesData.serpientes.map((nombre: string) => ({ id: nombre, tipo: 'Serpiente', nombre })),
      ...stairsData.escaleras.map((nombre: string) => ({ id: nombre, tipo: 'Escalera', nombre }))
    ];

    return {
      username: data.nombre,
      fotoPerfil: data.iconoActual,
      victorias: data.victorias,
      derrotas: data.derrotas,
      sep: data.SEP,
      cosmeticos: [
        { id: 'ficha_actual', tipo: 'Ficha', nombre: data.FichaActual },
        { id: 'serpiente_actual', tipo: 'Serpiente', nombre: data.SerpienteActual },
        { id: 'escalera_actual', tipo: 'Escalera', nombre: data.EscaleraActual }
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
      case 'Ficha':
        endpoint = 'pawn';
        bodyData = { pawn: item.nombre };
        break;
      case 'Serpiente':
        endpoint = 'snake';
        bodyData = { snake: item.nombre };
        break;
      case 'Escalera':
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