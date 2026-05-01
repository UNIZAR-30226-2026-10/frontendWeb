'use client';

import React from 'react';
import { Amigo } from '@/types/amigo';

interface TarjetaAmigoProps {
  amigo: Amigo;
}

const TarjetaAmigo: React.FC<TarjetaAmigoProps> = ({ amigo }) => {
  return (
    <div className="flex items-center gap-3 p-2 hover:bg-white/10 rounded-lg transition-colors cursor-pointer group">
      {/* Avatar circular */}
      <div className="w-10 h-10 rounded-full border-2 border-white/20 overflow-hidden bg-gray-600 shrink-0">
        <img 
          src={amigo.avatar} 
          alt={amigo.nombre} 
          className="w-full h-full object-cover"
          onError={(e) => (e.currentTarget.src = '/iconos/default_user.png')}
        />
      </div>

      {/* Nombre y Email */}
      <div className="flex flex-col min-w-0">
        <span className="text-white font-bold text-sm truncate group-hover:text-yellow-400 transition-colors">
          {amigo.nombre}
        </span>
        <span className="text-gray-400 text-[10px] truncate">
          {amigo.id}
        </span>
      </div>
    </div>
  );
};

export default TarjetaAmigo;