import { Amigo } from '@/types/amigo';
import { Invitacion } from '@/types/invitacion';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const AmigosService = {
  getAmigos: async (email: string): Promise<Amigo[]> => {
    try {
      const response = await fetch(`${API_URL}/users/${email}/friends`, {
        method: 'GET',
        credentials: 'include', // Necesario para verifyToken
      });

      if (!response.ok) throw new Error('Error al obtener amigos');

      const data = await response.json();
      // data.friends es un string[] de emails según tu backend:
      // return user.amigos.map((amigo: any) => amigo.email);

      return data.friends.map((amigoEmail: string) => ({
        id: amigoEmail,
        nombre: amigoEmail.split('@')[0], // Usamos la parte antes del @ como nombre temporal
        avatar: '/iconos/default_user.png', // Avatar por defecto
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

  // Eliminar amigo (DELETE /api/users/:email/friends)
  removeAmigo: async (userEmail: string, friendUsername: string) => {
    const response = await fetch(`${API_URL}/users/${userEmail}/friends?friendUsername=${friendUsername}`, {
      method: 'DELETE',
      credentials: 'include',
      // Nota: Ajusta según cómo reciba el back el username (query param o body)
    });

    if (!response.ok) throw new Error('Error al eliminar amigo');
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