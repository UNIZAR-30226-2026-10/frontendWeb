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
      // data.friends es un array de objetos { nombre: string, icono?: string }
      // El backend devuelve el username y el nombre del cosmético de icono equipado
      return data.friends.map((amigo: { nombre: string; icono?: string | null }) => {
        // Convertir el nombre del cosmético a URL de imagen (mismo patrón que generarUrlImagen en perfil.service.ts)
        const avatarUrl =
          amigo.icono && amigo.icono !== '' && amigo.icono.toLowerCase() !== 'null'
            ? `/${amigo.icono.toLowerCase().replace(/\s+/g, '_')}.png`
            : '/iconos/default_user.png';

        return {
          id: amigo.nombre,     // username como identificador único, nunca el email
          nombre: amigo.nombre, // username como nombre de visualización
          avatar: avatarUrl,
        };
      });
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

  getInvitaciones: async (username: string): Promise<Invitacion[]> => {
    const response = await fetch(`${API_URL}/users/${username}/invites`, {
      credentials: 'include',
    });

    if (!response.ok) return [];

    const data = await response.json().catch(() => ({ invites: [] }));
    const invitesRaw = data.invites || [];

    // El backend puede devolver lobbyID; el front consume partidaID.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return invitesRaw.map((i: any) => ({
      inviteFor: i.inviteFor,
      inviteFrom: i.inviteFrom,
      partidaID: i.partidaID || i.lobbyID || '',
    }));
  },
};