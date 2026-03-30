'use client';

import React from 'react';
import TarjetaAmigo from '../interfaz/TarjetaAmigo';
import { useAmigos } from '@/hooks/useAmigos';

const BarraAmigos = () => {
  const { amigos, isLoading, error } = useAmigos('admin@juego.com');

  return (
    <div className='flex flex-col bg-[#1a237e] h-screen w-80 shadow-2xl'>
      <div className="flex items-center justify-center gap-2 pt-6">
        <span className="text-white text-2xl">👤</span>
        <h1 className='text-3xl font-bold text-white'>Amigos</h1>
      </div>
      
      {/* Buscador temporal, se puede cambiar mas adelante */}
      <div className="px-4 mt-4">
        <div className="border-b border-gray-500 flex justify-between items-center pb-1">
          <div className="w-full h-1"></div>
          <span className="text-gray-400">🔍</span>
        </div>
      </div>

      {isLoading && (
        <div className='mt-4 px-2'>
          <p className="text-gray-400 text-center">Cargando amigos...</p>
        </div>
      )}

      {error && (
        <div className='mt-4 px-2'>
          <p className="text-red-400 text-center">Error: {error}</p>
        </div>
      )}

      {!isLoading && !error && (
        <div className='mt-4 flex-1 flex flex-col gap-2 px-2 overflow-y-auto custom-scroll'>
          {amigos.map((friend) => (
            <TarjetaAmigo key={friend.id} amigo={friend} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BarraAmigos;