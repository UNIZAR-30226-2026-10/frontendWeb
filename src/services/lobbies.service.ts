import { Lobby } from '../types/lobby';
import { Invitacion } from '../types/invitacion';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const LobbiesService = {
  crearLobby: async (username: string): Promise<Lobby> => {
    const response = await fetch(`${API_URL}/lobbies`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username }),
    });

    if (!response.ok) throw new Error('Error al crear el lobby');
    return response.json();
  },

  obtenerTablerosDisponibles: async (): Promise<Array<{ nombre: string }>> => {
    const response = await fetch(`${API_URL}/boards`, {
      method: 'GET',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) throw new Error('Error al obtener los tableros disponibles');

    const data = await response.json() as string[];
    return data.map((nombre) => ({ nombre }));
  },

  obtenerLobbyDeJugador: async (username: string): Promise<Lobby | null> => {
    const response = await fetch(`${API_URL}/lobbies/by-player/${username}`, {
      method: 'GET',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.status === 404) return null;
    if (!response.ok) throw new Error('Error al obtener el lobby del jugador');
    return response.json();
  },

  obtenerLobby: async (lobbyId: string): Promise<Lobby> => {
    const response = await fetch(`${API_URL}/lobbies/${lobbyId}`, {
      method: 'GET',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) throw new Error('Error al obtener el lobby');
    return response.json();
  },

  enviarInvitacion: async (
    lobbyId: string,
    inviteFrom: string,
    inviteFor: string
  ): Promise<{ message: string }> => {
    const response = await fetch(`${API_URL}/lobbies/${lobbyId}/invitations`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ inviteFrom, inviteFor }),
    });

    if (!response.ok) throw new Error('Error al enviar la invitación');
    return response.json();
  },

  responderInvitacion: async (
    lobbyId: string,
    datos: {
      inviteFor: string;
      inviteFrom: string;
      accept: boolean;
    }
  ): Promise<Lobby | { message: string }> => {
    const response = await fetch(`${API_URL}/lobbies/${lobbyId}/invitations`, {
      method: 'PUT',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos),
    });

    if (!response.ok) throw new Error('Error al responder la invitación');
    return response.json();
  },
  recibirInvitaciones: async (username: string): Promise<Invitacion[]> => {
    const response = await fetch(`${API_URL}/users/${username}/invites`, {
      method: 'GET',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) return [];
    const data = await response.json().catch(() => ({ invites: [] }));
    const invitesRaw = data.invites || [];
    // Normalize backend field names: accept either 'lobbyID' or 'partidaID'
    const invites: Invitacion[] = invitesRaw.map((i: any) => ({
      inviteFor: i.inviteFor,
      inviteFrom: i.inviteFrom,
      partidaID: i.partidaID || i.lobbyID || '',
    }));
    return invites;
  },
  agregarBot: async (lobbyId: string, requestedBy: string): Promise<Lobby> => {
    const response = await fetch(`${API_URL}/lobbies/${lobbyId}/bots`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ requested_by: requestedBy }),
    });

    if (!response.ok) throw new Error('Error al agregar bot');
    return response.json();
  },

  seleccionarMazo: async (
    lobbyId: string,
    username: string,
    deck: string
  ): Promise<Lobby> => {
    const response = await fetch(
      `${API_URL}/lobbies/${lobbyId}/players/${username}/deck`,
      {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deck }),
      }
    );

    if (!response.ok) throw new Error('Error al seleccionar mazo');
    return response.json();
  },

  marcarListo: async (
    lobbyId: string,
    username: string,
    ready: boolean
  ): Promise<Lobby> => {
    const response = await fetch(
      `${API_URL}/lobbies/${lobbyId}/players/${username}/ready`,
      {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ready }),
      }
    );

    if (!response.ok) throw new Error('Error al marcar como listo');
    return response.json();
  },

  cambiarTablero: async (
    lobbyId: string,
    requestedBy: string,
    board: string
  ): Promise<Lobby> => {
    const response = await fetch(`${API_URL}/lobbies/${lobbyId}/board`, {
      method: 'PUT',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ requested_by: requestedBy, board }),
    });

    if (!response.ok) throw new Error('Error al cambiar tablero');
    return response.json();
  },

  eliminarJugador: async (
    lobbyId: string,
    username: string,
    requestedBy: string
  ): Promise<Lobby> => {
    const response = await fetch(
      `${API_URL}/lobbies/${lobbyId}/players/${username}`,
      {
        method: 'DELETE',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requested_by: requestedBy }),
      }
    );

    if (!response.ok) throw new Error('Error al eliminar jugador');
    return response.json();
  },
};