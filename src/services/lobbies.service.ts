
import { Lobby } from '../types/lobby';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const LobbiesService = {

  createLobby: async (email: string, username: string): Promise<Lobby> => {
    const response = await fetch(`${API_URL}/lobbies`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, username }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Error al crear el lobby');
    return data as Lobby;
  },

  getLobby: async (lobbyId: string): Promise<Lobby> => {
    const response = await fetch(`${API_URL}/lobbies/${lobbyId}`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Lobby no encontrado');
    return data as Lobby;
  },

  joinLobby: async (lobbyId: string, email: string, username: string): Promise<Lobby> => {
    const response = await fetch(`${API_URL}/lobbies/${lobbyId}/players`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, username }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Error al unirse al lobby');
    return data as Lobby;
  },

  addBot: async (lobbyId: string, requestedBy: string): Promise<Lobby> => {
    const response = await fetch(`${API_URL}/lobbies/${lobbyId}/bots`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ requested_by: requestedBy }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Error al añadir bot');
    return data as Lobby;
  },

  selectDeck: async (lobbyId: string, email: string, deckName: string): Promise<void> => {
    const response = await fetch(`${API_URL}/lobbies/${lobbyId}/players/${email}/deck`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ deck_name: deckName }),
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || 'Error al seleccionar mazo');
    }
  },

  setReady: async (lobbyId: string, email: string, isReady: boolean): Promise<void> => {
    const response = await fetch(`${API_URL}/lobbies/${lobbyId}/players/${email}/ready`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_ready: isReady }),
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || 'Error al cambiar estado de listo');
    }
  },

  leaveOrKick: async (lobbyId: string, targetEmail: string, requestedBy: string): Promise<void> => {
    const response = await fetch(`${API_URL}/lobbies/${lobbyId}/players/${targetEmail}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ requested_by: requestedBy }),
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || 'Error al expulsar/abandonar');
    }
  }
};