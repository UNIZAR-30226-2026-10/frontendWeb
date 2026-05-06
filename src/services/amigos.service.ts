import { Amigo } from '@/types/amigo';
import { Invitacion } from '@/types/invitacion';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const AmigosService = {
  getAmigos: async (email: string): Promise<Amigo[]> => {
    try {
      const response = await fetch(`${API_URL}/users/${email}/friends`, {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) throw new Error('Error al obtener amigos');

      const data = await response.json();
      // data.friends es un string[] de usernames (nombres de usuario)
      // El backend devuelve amigo.nombre, nunca el email de los amigos
      return data.friends.map((amigoUsername: string) => ({
        id: amigoUsername,              // username como identificador único
        nombre: amigoUsername,          // username como nombre de visualización
        avatar: '/iconos/default_user.png',
      }));
    } catch (error) {
      console.error('Failed to fetch friends:', error);
      return [];
    }
  },

  // Añadir amigo (Usa el endpoint que definiste: POST /:email/:friendUsername/invites)
  addAmigo: async (userEmail: string, friendUsername: string) => {
    const response = await fetch(`${API_URL}/users/${userEmail}/${friendUsername}/invites`, {
      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error || 'No se pudo añadir al amigo');
    }
    return response.json();
  },

  // Eliminar amigo (DELETE /api/users/:email/friends/:friendUsername)
  removeAmigo: async (userEmail: string, friendUsername: string) => {
    const response = await fetch(`${API_URL}/users/${userEmail}/friends/${friendUsername}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error || 'Error al eliminar amigo');
    }
    return response.json();
  },

  getInvitaciones: async (email: string): Promise<Invitacion[]> => {
  const response = await fetch(`${API_URL}/users/${email}/invites`, {
    credentials: 'include'
  });
  if (!response.ok) return [];
  const data = await response.json();
  return data.invites; // Devuelve el array de invitaciones
},
};