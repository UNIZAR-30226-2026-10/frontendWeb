// src/hooks/useLobby.ts
import { useState } from 'react';
import { LobbiesService } from '../services/lobbies.service';
import { Lobby } from '../types/lobby';

export const useLobby = () => {
  // Estados para la UI
  const [lobby, setLobby] = useState<Lobby | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const cargarLobby = async (lobbyId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await LobbiesService.getLobby(lobbyId);
      setLobby(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const crearLobby = async (email: string, username: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await LobbiesService.createLobby(email, username);
      setLobby(data);
      return data.idLobby; 
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const unirseLobby = async (lobbyId: string, email: string, username: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await LobbiesService.joinLobby(lobbyId, email, username);
      setLobby(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const añadirBot = async (lobbyId: string, requestedBy: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await LobbiesService.addBot(lobbyId, requestedBy);
      setLobby(data); 
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const seleccionarMazo = async (lobbyId: string, email: string, deckName: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await LobbiesService.selectDeck(lobbyId, email, deckName);
      await cargarLobby(lobbyId); // Refresca para ver el mazo
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const cambiarEstadoListo = async (lobbyId: string, email: string, isReady: boolean) => {
    setIsLoading(true);
    setError(null);
    try {
      await LobbiesService.setReady(lobbyId, email, isReady);
      await cargarLobby(lobbyId); // Refresca para ver el check verde
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const abandonarOExpulsar = async (lobbyId: string, targetEmail: string, requestedBy: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await LobbiesService.leaveOrKick(lobbyId, targetEmail, requestedBy);
      
      if (targetEmail === requestedBy) {
        // Yo mismo he abandonado la sala
        setLobby(null); 
      } else {
        // He expulsado a alguien, refresco la lista
        await cargarLobby(lobbyId);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    lobby,
    isLoading,
    error,
    cargarLobby,
    crearLobby,
    unirseLobby,
    añadirBot,
    seleccionarMazo,
    cambiarEstadoListo,
    abandonarOExpulsar
  };
};