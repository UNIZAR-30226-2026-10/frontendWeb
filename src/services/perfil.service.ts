import { PerfilUI } from '@/types/perfil';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const PerfilService = {
  getPerfil: async (email: string): Promise<PerfilUI> => {
    const response = await fetch(`${API_URL}/users/${email}/profile`, {
      method: 'GET',
      credentials: 'include', 
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error || 'Error al obtener el perfil');
    }

    const data = await response.json();

    return {
      username: data.nombre,
      fotoPerfil: data.iconoActual, 
      victorias: data.victorias,
      derrotas: data.derrotas,
      sep: data.SEP,
      cosmeticos: [
        { id: 'ficha', tipo: 'Ficha', nombre: data.FichaActual },
        { id: 'serpiente', tipo: 'Serpiente', nombre: data.SerpienteActual },
        { id: 'escalera', tipo: 'Escalera', nombre: data.EscaleraActual }
      ],
      // Hay que hacer las llamadas a la API
      todosMisCosmeticos: [] 
    };
  },

  equiparCosmetico: async (email: string, cosmeticoId: string): Promise<boolean> => {
    console.log(`API: Guardando item ${cosmeticoId} para el usuario ${email}`);
    const response = await fetch(`${API_URL}/users/${email}/equip`, {
      method: 'POST', 
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cosmeticoId })
    });
    
    if (!response.ok) {
      throw new Error('Error al equipar el cosmético');
    }

    return response.ok;
  }
};