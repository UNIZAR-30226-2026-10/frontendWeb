'use client';

import React, { useState } from 'react';
import TarjetaAmigo from '../interfaz/TarjetaAmigo';
import { useAmigos } from '@/hooks/useAmigos';
import { useInvitaciones } from '@/hooks/useInvitaciones';
import { useUser } from '@/context/userContext';

const BarraAmigos = () => {
  const { userEmail, username } = useUser();
  const { amigos, isLoading, agregarAmigo, isAdding, addError, setAddError, eliminarAmigo } = useAmigos(userEmail || '');
  const { invitaciones, responder } = useInvitaciones(username || '');

  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [nombreAmigo, setNombreAmigo] = useState('');
  const [exito, setExito] = useState(false);

  const handleAbrirPopup = () => {
    setNombreAmigo('');
    setAddError(null);
    setExito(false);
    setMostrarPopup(true);
  };

  const handleCerrarPopup = () => {
    setMostrarPopup(false);
    setNombreAmigo('');
    setAddError(null);
    setExito(false);
  };

  const handleEnviar = async () => {
    if (!nombreAmigo.trim()) return;
    const ok = await agregarAmigo(nombreAmigo.trim());
    if (ok) {
      setExito(true);
      setNombreAmigo('');
      // Cierra el popup tras 1.5 s
      setTimeout(() => handleCerrarPopup(), 1500);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleEnviar();
    if (e.key === 'Escape') handleCerrarPopup();
  };

  return (
    <>
      {/* ── POPUP AÑADIR AMIGO ── */}
      {mostrarPopup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backdropFilter: 'blur(6px)', backgroundColor: 'rgba(0,0,0,0.55)' }}
          onClick={(e) => { if (e.target === e.currentTarget) handleCerrarPopup(); }}
        >
          <div className="relative bg-[#1a2660] border-2 border-yellow-400 rounded-2xl p-8 w-full max-w-sm shadow-2xl flex flex-col gap-5">
            {/* X cerrar */}
            <button
              onClick={handleCerrarPopup}
              className="absolute top-3 right-4 text-white/60 hover:text-white text-2xl font-bold leading-none transition-colors"
              title="Cerrar"
            >
              ✕
            </button>

            <h2 className="text-white text-xl font-bold text-center">➕ Añadir amigo</h2>

            <div className="flex flex-col gap-2">
              <label className="text-gray-300 text-sm font-semibold">Nombre de usuario</label>
              <input
                type="text"
                value={nombreAmigo}
                onChange={(e) => { setNombreAmigo(e.target.value); setAddError(null); setExito(false); }}
                onKeyDown={handleKeyDown}
                placeholder="ej. SuperJuan"
                autoFocus
                className="bg-white/10 text-white placeholder:text-gray-400 border border-white/20 rounded-lg px-4 py-2 outline-none focus:border-yellow-400 transition-colors text-sm"
              />
            </div>

            {/* Error */}
            {addError && (
              <p className="text-red-400 text-xs font-semibold text-center -mt-2">{addError}</p>
            )}

            {/* Éxito */}
            {exito && (
              <p className="text-green-400 text-xs font-semibold text-center -mt-2">¡Solicitud enviada correctamente! 🎉</p>
            )}

            <button
              onClick={handleEnviar}
              disabled={isAdding || !nombreAmigo.trim()}
              className="w-full bg-yellow-400 hover:bg-yellow-300 disabled:opacity-50 disabled:cursor-not-allowed text-[#0a0f2c] font-bold py-2 rounded-lg transition-colors text-sm uppercase tracking-wide"
            >
              {isAdding ? 'Enviando...' : 'Enviar solicitud'}
            </button>
          </div>
        </div>
      )}

      {/* ── BARRA LATERAL ── */}
      <div className='flex flex-col bg-[#283F9F] h-screen w-80 shadow-2xl'>
        <div className="flex items-center justify-center gap-2 pt-6 shrink-0">
          <span className="text-white text-2xl">👤</span>
          <h1 className='text-3xl font-bold text-white'>Amigos</h1>
        </div>

        {/* SECCIÓN DE INVITACIONES PENDIENTES */}
        {invitaciones.length > 0 && (
          <div className="px-4 mt-4 animate-bounce-subtle">
            <p className="text-yellow-400 text-[10px] font-bold uppercase mb-2">Invitaciones de partida ({invitaciones.length})</p>
            <div className="flex flex-col gap-2">
              {invitaciones.map((invite, idx) => (
                <div key={idx} className="bg-white/10 p-2 rounded-lg border border-yellow-400/50 flex flex-col gap-2">
                  <p className="text-white text-xs font-bold">De: <span className="text-yellow-400">{invite.inviteFrom}</span></p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => responder(invite, true)}
                      className="flex-1 bg-green-600 hover:bg-green-500 text-white text-[10px] py-1 rounded font-bold uppercase transition-colors"
                    >
                      Aceptar
                    </button>
                    <button
                      onClick={() => responder(invite, false)}
                      className="flex-1 bg-red-600 hover:bg-red-500 text-white text-[10px] py-1 rounded font-bold uppercase transition-colors"
                    >
                      Rechazar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Botón Añadir Amigo */}
        <div className="px-4 mt-4 shrink-0">
          <button
            onClick={handleAbrirPopup}
            className="w-full bg-yellow-400 hover:bg-yellow-300 text-[#0a0f2c] font-bold py-2 rounded-lg transition-colors text-sm uppercase tracking-wide flex items-center justify-center gap-2"
          >
            <span>➕</span> Añadir amigo
          </button>
        </div>

        {/* Lista de amigos */}
        <div className='mt-4 flex-1 flex flex-col gap-2 px-2 overflow-y-auto custom-scroll pb-10'>
          {!isLoading && amigos.map((friend) => {
            const invitacionPendiente = invitaciones.find(i => i.inviteFrom === friend.nombre);
            return (
              <TarjetaAmigo
                key={friend.id}
                amigo={friend}
                onEliminar={eliminarAmigo}
                currentUsername={username || ''}
                invitacionPendiente={invitacionPendiente}
                onResponder={responder}
              />
            );
          })}
          {!isLoading && amigos.length === 0 && (
            <p className="text-gray-400 text-xs text-center mt-6">Aún no tienes amigos.<br />¡Añade uno con el botón de arriba!</p>
          )}
        </div>
      </div>
    </>
  );
};

export default BarraAmigos;
