'use client';

import { useEffect, useCallback, useState } from 'react';
import { Invitacion } from '@/types/invitacion';
import { AmigosService } from '@/services/amigos.service';
import { LobbiesService } from '@/services/lobbies.service';

// Ahora el hook recibe `username` porque el endpoint GET usa /users/{username}/invites
export const useInvitaciones = (username: string) => {
  const [invitaciones, setInvitaciones] = useState<Invitacion[]>([]);

  const fetchInvites = useCallback(async () => {
    if (!username) return;
    const data = await AmigosService.getInvitaciones(username);
    setInvitaciones(data || []);
  }, [username]);

  useEffect(() => {
    fetchInvites();
    const interval = setInterval(fetchInvites, 10000); // Polling cada 10 seg
    return () => clearInterval(interval);
  }, [fetchInvites]);

  const responder = async (invite: Invitacion, aceptar: boolean) => {
    const lobbyId = invite.partidaID || invite.lobbyID || '';
    if (!lobbyId) {
      alert('No se pudo procesar la invitacion: falta lobbyId en el payload');
      return;
    }

    try {
      await LobbiesService.responderInvitacion(lobbyId, {
        inviteFor: invite.inviteFor,
        inviteFrom: invite.inviteFrom,
        accept: aceptar,
      });
      fetchInvites();
      // Al aceptar, redirigir al lobby (juego/page.tsx detecta el lobby existente)
      if (aceptar) window.location.href = `/juego`;
    } catch (err) {
      alert('Error al procesar la invitación');
    }
  };

  return { invitaciones, responder };
};