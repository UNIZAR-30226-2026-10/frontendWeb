'use client';

import { useState, useEffect, useCallback } from 'react';
import { Invitacion } from '@/types/invitacion';
import { AmigosService } from '@/services/amigos.service';
import { LobbiesService } from '@/services/lobbies.service';

export const useInvitaciones = (email: string, username: string) => {
  const [invitaciones, setInvitaciones] = useState<Invitacion[]>([]);

  const fetchInvites = useCallback(async () => {
    if (!email) return;
    const data = await AmigosService.getInvitaciones(email);
    setInvitaciones(data);
  }, [email]);

  useEffect(() => {
    fetchInvites();
    const interval = setInterval(fetchInvites, 10000); // Polling cada 10 seg
    return () => clearInterval(interval);
  }, [fetchInvites]);

  const responder = async (invite: Invitacion, aceptar: boolean) => {
    try {
      await LobbiesService.responderInvitacion(invite.partidaID, {
        inviteFor: invite.inviteFor,
        inviteFrom: invite.inviteFrom,
        username: username,
        accept: aceptar
      });
      // Si acepta, la lógica de redirección al lobby iría aquí o en el componente
      fetchInvites(); // Refrescamos lista
      if (aceptar) window.location.href = `/juego/lobby/${invite.partidaID}`;
    } catch (err) {
      alert("Error al procesar la invitación");
    }
  };

  return { invitaciones, responder };
};