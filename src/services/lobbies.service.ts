const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const LobbiesService = {
  responderInvitacion: async (lobbyId: string, datos: { 
    inviteFor: string, 
    username: string, 
    inviteFrom: string, 
    accept: boolean 
  }) => {
    const response = await fetch(`${API_URL}/lobbies/${lobbyId}/invitations`, {
      method: 'PUT',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos),
    });

    if (!response.ok) throw new Error('Error al responder la invitación');
    return response.json();
  }
};