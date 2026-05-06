'use client';

import React, { useState } from 'react';
import { Amigo } from '@/types/amigo';
import { Invitacion } from '@/types/invitacion';
import AmigoOpciones from './AmigoOpciones';

interface TarjetaAmigoProps {
  amigo: Amigo;
  onEliminar?: (friendUsername: string) => Promise<boolean>;
  currentUsername?: string;
  invitacionPendiente?: Invitacion;
  onResponder?: (invite: Invitacion, aceptar: boolean) => Promise<void>;
}

const TarjetaAmigo: React.FC<TarjetaAmigoProps> = ({ amigo, onEliminar, currentUsername, invitacionPendiente, onResponder }) => {
  const [abierto, setAbierto] = useState(false);

  return (
    <div className="flex flex-col">
      {/* Tarjeta principal */}
      <div
        onClick={() => setAbierto(!abierto)}
        className="flex items-center gap-3 p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors cursor-pointer group"
      >
        {/* Avatar circular */}
        <div className="w-10 h-10 rounded-full border-2 border-white/30 overflow-hidden bg-gray-600 shrink-0">
          <img
            src={amigo.avatar}
            alt={amigo.nombre}
            className="w-full h-full object-cover"
            onError={(e) => (e.currentTarget.src = '/iconos/default_user.png')}
          />
        </div>

        {/* Nombre de usuario */}
        <div className="flex flex-col min-w-0 flex-1">
          <span className="text-white font-bold text-sm truncate group-hover:text-yellow-400 transition-colors">
            {amigo.nombre}
          </span>
        </div>

        {/* Indicador de invitación pendiente + flecha */}
        <div className="flex items-center gap-1 shrink-0">
          {invitacionPendiente && (
            <span className="text-yellow-400 text-xs animate-pulse" title="Invitación pendiente">●</span>
          )}
          <span className={`text-gray-400 text-xs transition-transform duration-200 ${abierto ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </div>
      </div>

      {/* Desplegable de opciones */}
      {abierto && (
        <AmigoOpciones
          amigo={amigo}
          onEliminar={onEliminar}
          currentUsername={currentUsername}
          invitacionPendiente={invitacionPendiente}
          onResponder={onResponder}
        />
      )}
    </div>
  );
};

export default TarjetaAmigo;