'use client';

import { useState, useCallback, useContext } from 'react';
import { LobbiesService } from '../services/lobbies.service';
import { Lobby } from '../types/lobby';
import { userContext } from '../context/userContext';

export const useLobby = () => {
  const context = useContext(userContext);
  const username = context?.username;

  const [lobby, setLobby] = useState<Lobby | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const crearLobby = useCallback(async () => {
    if (!username) {
      setError('Usuario no autenticado');
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const nuevoLobby = await LobbiesService.crearLobby(username);

      setLobby(nuevoLobby);
      return nuevoLobby;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, [username]);

  const obtenerLobby = useCallback(async (lobbyId: string) => {
    setLoading(true);
    setError(null);

    try {
      const lobbyData = await LobbiesService.obtenerLobby(lobbyId);

      // FIX: Asegurar que el tablero sea válido
      if (lobbyData.tablero === 'Tablero 1' && username) {
        const lobbyCorregido = await LobbiesService.cambiarTablero(lobbyId, username, 'Basico');
        setLobby(lobbyCorregido);
        return lobbyCorregido;
      }

      setLobby(lobbyData);
      return lobbyData;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, [username]);

  const obtenerLobbyDeJugador = useCallback(async () => {
    if (!username) {
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const lobbyData = await LobbiesService.obtenerLobbyDeJugador(username);
      if (lobbyData) {
        // FIX: Asegurar que el tablero sea válido
        if (lobbyData.tablero === 'Tablero 1') {
          const lobbyCorregido = await LobbiesService.cambiarTablero(lobbyData.idLobby, username, 'Basico');
          setLobby(lobbyCorregido);
          return lobbyCorregido;
        }
        setLobby(lobbyData);
      }
      return lobbyData;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, [username]);

  const enviarInvitacion = useCallback(
    async (lobbyId: string, inviteFor: string) => {
      if (!username) {
        setError('Usuario no autenticado');
        return false;
      }

      setLoading(true);
      setError(null);

      try {
        await LobbiesService.enviarInvitacion(lobbyId, username, inviteFor);
        return true;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
        setError(errorMessage);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [username]
  );

  const responderInvitacion = useCallback(
    async (lobbyId: string, inviteFrom: string, accept: boolean) => {
      if (!username) {
        setError('Usuario no autenticado');
        return null;
      }

      setLoading(true);
      setError(null);

      try {
        const resultado = await LobbiesService.responderInvitacion(lobbyId, {
          inviteFor: username,
          inviteFrom,
          accept,
        });

        if ('idLobby' in resultado) {
          setLobby(resultado);
        }

        return resultado;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
        setError(errorMessage);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [username]
  );

  const agregarBot = useCallback(
    async (lobbyId: string) => {
      if (!username) {
        setError('Usuario no autenticado');
        return null;
      }

      setLoading(true);
      setError(null);

      try {
        const lobbyActualizado = await LobbiesService.agregarBot(
          lobbyId,
          username
        );
        setLobby(lobbyActualizado);
        return lobbyActualizado;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
        setError(errorMessage);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [username]
  );

  const seleccionarMazo = useCallback(
    async (lobbyId: string, deckName: string) => {
      if (!username) {
        setError('Usuario no autenticado');
        return null;
      }

      setLoading(true);
      setError(null);

      try {
        const lobbyActualizado = await LobbiesService.seleccionarMazo(
          lobbyId,
          username,
          deckName
        );
        setLobby(lobbyActualizado);
        return lobbyActualizado;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
        setError(errorMessage);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [username]
  );

  const marcarListo = useCallback(
    async (lobbyId: string, ready: boolean) => {
      if (!username) {
        setError('Usuario no autenticado');
        return null;
      }

      setLoading(true);
      setError(null);

      try {
        const lobbyActualizado = await LobbiesService.marcarListo(
          lobbyId,
          username,
          ready
        );
        setLobby(lobbyActualizado);
        return lobbyActualizado;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
        setError(errorMessage);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [username]
  );

  const cambiarTablero = useCallback(
    async (lobbyId: string, boardName: string) => {
      if (!username) {
        setError('Usuario no autenticado');
        return null;
      }

      setLoading(true);
      setError(null);

      try {
        const lobbyActualizado = await LobbiesService.cambiarTablero(
          lobbyId,
          username,
          boardName
        );
        setLobby(lobbyActualizado);
        return lobbyActualizado;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
        setError(errorMessage);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [username]
  );

  const eliminarJugador = useCallback(
    async (lobbyId: string, playerUsername: string) => {
      if (!username) {
        setError('Usuario no autenticado');
        return null;
      }

      setLoading(true);
      setError(null);

      try {
        const lobbyActualizado = await LobbiesService.eliminarJugador(
          lobbyId,
          playerUsername,
          username
        );
        setLobby(lobbyActualizado);
        return lobbyActualizado;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
        setError(errorMessage);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [username]
  );

  const limpiarError = useCallback(() => {
    setError(null);
  }, []);

  const limpiarLobby = useCallback(() => {
    setLobby(null);
  }, []);

  return {
    lobby,
    loading,
    error,
    crearLobby,
    obtenerLobby,
    obtenerLobbyDeJugador,
    enviarInvitacion,
    responderInvitacion,
    agregarBot,
    seleccionarMazo,
    marcarListo,
    cambiarTablero,
    eliminarJugador,
    limpiarError,
    limpiarLobby,
  };
};
