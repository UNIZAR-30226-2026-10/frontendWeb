'use client';

import React from 'react';
import TarjetaAmigo from '../interfaz/TarjetaAmigo';
import { useAmigos } from '@/hooks/useAmigos';
import { useInvitaciones } from '@/hooks/useInvitaciones';
import { useUser } from '@/context/userContext';

const BarraAmigos = () => {
  const { userEmail } = useUser();
  const { amigos, isLoading, error } = useAmigos(userEmail || '');
  // Asumimos que perfil tiene el nombre real del usuario para la API
  const { invitaciones, responder } = useInvitaciones(userEmail || '', userEmail?.split('@')[0] || '');

  return (
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

      {/* Buscador minimalista original */}
      <div className="px-4 mt-4 shrink-0">
        <div className="border-b border-gray-500 flex justify-between items-center pb-1">
          <input type="text" placeholder="Buscar..." className="bg-transparent text-white outline-none placeholder:text-gray-400 text-sm w-full" />
          <span className="text-gray-400">🔍</span>
        </div>
      </div>

      {/* Lista de amigos (se queda igual) */}
      <div className='mt-4 flex-1 flex flex-col gap-2 px-2 overflow-y-auto custom-scroll pb-10'>
        {!isLoading && amigos.map((friend) => (
          <TarjetaAmigo key={friend.id} amigo={friend} />
        ))}
      </div>
    </div>
  );
};

export default BarraAmigos;