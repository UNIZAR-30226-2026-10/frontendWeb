import { Partida, throwDiceResponse } from "../types/partida";
import { ChatResponse } from "../types/partida";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const MatchesService = {
    iniciarPartida: async (lobbyId: string): Promise<Partida> => {
        const response = await fetch(`${API_URL}/matches/`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ lobby_id: lobbyId })
        });
        if (!response.ok) {
            const err = await response.json().catch(() => ({}));
            throw new Error(err.error || 'Error al iniciar la partida');
        }
        return response.json();
    },
    obtenerEstadoPartida: async (partidaId: string, username: string): Promise<Partida> => {
        const response = await fetch(`${API_URL}/matches/${partidaId}/${username}`, {
            method: 'GET',
            credentials: 'include'
        });
        if (!response.ok) {
            const err = await response.json().catch(() => ({}));
            throw new Error(err.error || 'Error al obtener la partida');
        }
        return response.json();
    },
    obtenerChatPartida: async (partidaId: string, username: string): Promise<ChatResponse> => {
        const response = await fetch(`${API_URL}/matches/${partidaId}/chat/${username}`, {
            method: 'GET',
            credentials: 'include'
        });
        if (!response.ok) {
            const err = await response.json().catch(() => ({}));
            throw new Error(err.error || 'Error al obtener el chat de la partida');
        }
        return response.json();
    },
    enviarMensajeChat: async (partidaId: string, username: string, mensaje: string): Promise<ChatResponse> => {
        const response = await fetch(`${API_URL}/matches/${partidaId}/chat/${username}`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: mensaje })
        });
        if (!response.ok) {
            const err = await response.json().catch(() => ({}));
            throw new Error(err.error || 'Error al enviar el mensaje al chat de la partida');
        }
        return response.json();
    },
    jugarCarta: async (partidaId: string, username: string, cartaId: string, who?: (string | number), inicio?: number, fin?: number): Promise<Partida> => {
        const response = await fetch(`${API_URL}/matches/${partidaId}/cards/${username}`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ card_id: cartaId, who, inicio, fin })
        });
        if (!response.ok) {
            const err = await response.json().catch(() => ({}));
            throw new Error(err.error || 'Error al jugar la carta');
        }
        return response.json();
    },
    tirarDado: async (partidaId: string, username: string): Promise<throwDiceResponse> => {
        const response = await fetch(`${API_URL}/matches/${partidaId}/dice/${username}`, {
            method: 'POST',
            credentials: 'include',
        });
        if (!response.ok) {
            const err = await response.json().catch(() => ({}));
            throw new Error(err.error || 'Error al tirar el dado');
        }
        return response.json();
    },
    moverFicha: async (partidaId: string, username: string, pawnId: number, posicionFinal: number, pasosRestantes: number): Promise<Partida> => {
        const response = await fetch(`${API_URL}/matches/${partidaId}/pawn/${username}`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ pawn_id: pawnId, final_position: posicionFinal, steps_remaining: pasosRestantes })
        });
        if (!response.ok) {
            const err = await response.json().catch(() => ({}));
            throw new Error(err.error || 'Error al mover la ficha');
        }
        return response.json();
    }
};