'use client';

import React, { useState } from 'react';
import { Amigo } from '@/types/amigo';
import { Invitacion } from '@/types/invitacion';
import { LobbiesService } from '@/services/lobbies.service';

interface AmigoOpcionesProps {
  amigo: Amigo;
  onEliminar?: (friendUsername: string) => Promise<boolean>;
  currentUsername?: string;
  invitacionPendiente?: Invitacion;
  onResponder?: (invite: Invitacion, aceptar: boolean) => Promise<void>;
}

const AmigoOpciones: React.FC<AmigoOpcionesProps> = ({
  amigo,
  onEliminar,
  currentUsername,
  invitacionPendiente,
  onResponder,
}) => {
  const [confirmando, setConfirmando] = useState(false);
  const [eliminando, setEliminando] = useState(false);
  const [invitando, setInvitando] = useState(false);
  const [inviteMsg, setInviteMsg] = useState<{ texto: string; ok: boolean } | null>(null);
  const [uniendose, setUniendose] = useState(false);

  // ── BORRAR AMIGO ────────────────────────────────────────────
  const handleBorrar = async () => {
    if (!onEliminar) return;
    setEliminando(true);
    await onEliminar(amigo.nombre);
    setEliminando(false);
    setConfirmando(false);
  };

  // ── INVITAR A PARTIDA ────────────────────────────────────────
  const handleInvitar = async () => {
    if (!currentUsername) {
      setInviteMsg({ texto: 'No se pudo obtener tu sesión', ok: false });
      return;
    }
    setInvitando(true);
    setInviteMsg(null);
    try {
      // 1. Obtener el lobby del usuario actual
      const lobby = await LobbiesService.obtenerLobbyDeJugador(currentUsername);
      if (!lobby) {
        setInviteMsg({ texto: 'No estás en ningún lobby', ok: false });
        return;
      }
      // 2. Enviar la invitación
      await LobbiesService.enviarInvitacion(lobby.idLobby, currentUsername, amigo.nombre);
      setInviteMsg({ texto: '¡Invitación enviada! 🎉', ok: true });
      setTimeout(() => setInviteMsg(null), 3000);
    } catch (err: any) {
      const msg = err.message || 'Error al enviar la invitación';
      setInviteMsg({ texto: msg, ok: false });
    } finally {
      setInvitando(false);
    }
  };

  // ── UNIRSE A PARTIDA (solo si hay invitación pendiente de este amigo) ───
  const handleUnirse = async () => {
    if (!invitacionPendiente || !onResponder) return;
    setUniendose(true);
    try {
      await onResponder(invitacionPendiente, true);
      // onResponder redirige a /juego si acepta, así que esto solo corre si falla
    } catch {
      setUniendose(false);
    }
  };

  return (
    <div className="bg-[#0a0f2c] mt-1 rounded-md p-2 flex flex-col gap-1 border-l-4 border-blue-500 ml-2">

      {/* ── INVITAR A LA PARTIDA ── */}
      <button
        onClick={handleInvitar}
        disabled={invitando}
        className="flex items-center gap-2 text-white text-sm hover:bg-blue-900 p-2 rounded transition-colors w-full text-left disabled:opacity-60"
      >
        <span>➕</span> {invitando ? 'Invitando...' : 'Invitar a la partida'}
      </button>
      {inviteMsg && (
        <p className={`text-[10px] px-2 font-semibold ${inviteMsg.ok ? 'text-green-400' : 'text-red-400'}`}>
          {inviteMsg.texto}
        </p>
      )}

      {/* ── UNIRSE A LA PARTIDA ── */}
      {invitacionPendiente ? (
        <button
          onClick={handleUnirse}
          disabled={uniendose}
          className="flex items-center gap-2 text-yellow-400 text-sm hover:bg-yellow-900/40 p-2 rounded transition-colors w-full text-left disabled:opacity-60"
        >
          <span>➔</span> {uniendose ? 'Uniéndose...' : 'Unirse a la partida ●'}
        </button>
      ) : (
        <button
          className="flex items-center gap-2 text-gray-500 text-sm cursor-not-allowed p-2 w-full text-left"
          disabled
          title="Este amigo no te ha invitado a ninguna partida"
        >
          <span>➔</span> Unirse a la partida
        </button>
      )}

      {/* ── BORRAR AMIGO ── */}
      {!confirmando ? (
        <button
          onClick={() => setConfirmando(true)}
          className="flex items-center gap-2 text-white text-sm hover:bg-red-900 p-2 rounded transition-colors w-full text-left"
        >
          <span>👤-</span> Borrar amigo
        </button>
      ) : (
        <div className="flex flex-col gap-1 p-1">
          <p className="text-yellow-400 text-xs font-semibold">
            ¿Eliminar a <span className="text-white">{amigo.nombre}</span>?
          </p>
          <div className="flex gap-2">
            <button
              onClick={handleBorrar}
              disabled={eliminando}
              className="flex-1 bg-red-700 hover:bg-red-600 disabled:opacity-50 text-white text-xs py-1 rounded font-bold transition-colors"
            >
              {eliminando ? 'Eliminando...' : 'Confirmar'}
            </button>
            <button
              onClick={() => setConfirmando(false)}
              disabled={eliminando}
              className="flex-1 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 text-white text-xs py-1 rounded font-bold transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AmigoOpciones;