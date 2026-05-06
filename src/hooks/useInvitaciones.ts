'use client';

import { useEffect, useCallback, useState } from 'react';
import { Invitacion } from '@/types/invitacion';
import { AmigosService } from '@/services/amigos.service';
import { LobbiesService } from '@/services/lobbies.service';

export const useInvitaciones = (email: string) => {
  const [invitaciones, setInvitaciones] = useState<Invitacion[]>([]);

  const fetchInvites = useCallback(async () => {
    if (!email) return;
    const data = await AmigosService.getInvitaciones(email);
    setInvitaciones(data || []);
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