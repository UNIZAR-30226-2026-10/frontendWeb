'use client';

import React from 'react';
import SlotSelectorSkin from '@/components/interfaz/SlotSelectorSkin';
import { usePerfil } from '@/hooks/usePerfil';

export default function Perfil() {
  const emailUsuario = "admin@juego.com"; 
  const { perfil, isLoading, error } = usePerfil(emailUsuario);

  if (isLoading) {
    return (
      <main className="w-full h-full flex flex-col p-4 md:p-8 overflow-hidden items-center justify-center">
        <p className="text-white text-xl">Cargando perfil...</p>
      </main>
    );
  }

  if (error || !perfil) {
    return (
      <main className="w-full h-full flex flex-col p-4 md:p-8 overflow-hidden items-center justify-center">
        <p className="text-red-500 text-xl">Error: {error || 'No se pudo cargar el perfil'}</p>
      </main>
    );
  }

  return (
    <main className="w-full h-full flex flex-col p-4 md:p-8 overflow-hidden">
      <div className="relative flex items-center justify-center text-white text-3xl mb-8 shrink-0">
        <h1 className="text-center font-bold">
          Perfil
        </h1>
      </div>

      <div className="relative bg-[#283F9F] border-2 border-yellow-400 rounded-4xl p-8 shadow-xl flex flex-col gap-8 max-w-5xl mx-auto w-full">
        
        <div className="absolute top-6 right-8 text-2xl font-bold text-white">
          {perfil.victorias}W/{perfil.derrotas}L
        </div>

        <div className="flex flex-row items-center gap-8 mt-4">
          
          <div className="relative">
            <div className="w-40 h-40 bg-white rounded-full border-4 border-black flex items-center justify-center overflow-hidden">
              {perfil.fotoPerfil ? (
                <img src={perfil.fotoPerfil} alt={perfil.username} className="w-full h-full object-cover" />
              ) : (
                <div className="text-green-600 text-6xl font-bold">Icono</div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-6 w-full max-w-md">
            <div className="flex items-center gap-4">
              <span className="font-bold text-xl underline">
                Nombre de usuario:
              </span>
              <div className="flex items-center justify-between bg-transparent border border-white rounded px-4 py-1 flex-grow cursor-pointer hover:bg-white/10 transition-colors">
                <span className="text-lg">{perfil.username}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-serif text-3xl text-gray-300 ">Sep</span>
              <span className="text-4xl font-bold text-white">{perfil.sep}</span>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <h2 className="text-2xl font-bold mb-6 text-white">Cosmeticos:</h2>
          
          <div className="flex flex-row flex-wrap justify-around gap-6">
            {perfil.cosmeticos.map((cosmetic) => (
              <SlotSelectorSkin 
                key={cosmetic.id}
                titulo={cosmetic.nombre} 
                imagenPlaceholder={cosmetic.imagen || `(Img ${cosmetic.tipo})}`} 
              />
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}