'use client';

import React, { useState } from 'react';
import SlotSelectorSkin from '@/components/interfaz/SlotSelectorSkin';
import SelectorSkin from '@/components/interfaz/SelectorSkin';
import { usePerfil } from '@/hooks/usePerfil';

export default function Perfil() {
  const emailUsuario = "admin@juego.com"; // Simulación de usuario logueado
  const { perfil, isLoading, error, actualizarEquipamiento } = usePerfil(emailUsuario);
  
  const [tipoEdicion, setTipoEdicion] = useState<string | null>(null);

  if (isLoading) {
    return <div className="text-white text-center mt-10 text-2xl w-full font-bold">Cargando Perfil...</div>;
  }

  if (error || !perfil) return (
    <main className="w-full h-full flex items-center justify-center bg-[#283F9F]">
      <p className="text-red-400 text-xl font-bold uppercase">{error}</p>
    </main>
  );

  return (
    <main className="w-full h-full flex flex-col p-4 md:p-6 overflow-hidden relative items-center justify-center">
      
      {/* Selector/Popup (Llama a actualizarEquipamiento del Hook) */}
      {tipoEdicion && (
        <SelectorSkin 
          titulo={tipoEdicion}
          items={perfil.todosMisCosmeticos.filter(c => c.tipo === tipoEdicion)}
          onClose={() => setTipoEdicion(null)}
          onSelect={(item) => {
            actualizarEquipamiento(item);
            setTipoEdicion(null);
          }}
          skinSeleccionadaId={perfil.cosmeticos.find(c => c.tipo === tipoEdicion)?.id}
        />
      )}

      <h1 className="text-white text-3xl font-bold mb-6 shrink-0">Perfil</h1>

      {/* Caja de Perfil (Estética Original) */}
      <div className="relative bg-[#283F9F] border-4 border-yellow-400 rounded-[2rem] p-8 shadow-xl flex flex-col gap-6 max-w-5xl w-full">
        
        <div className="absolute top-6 right-8 text-2xl font-bold text-white">
          {perfil.victorias}W/{perfil.derrotas}L
        </div>

        <div className="flex flex-row items-center gap-8 mt-4">
          <div className="relative shrink-0">
            <div className="w-40 h-40 bg-white rounded-full border-4 border-black flex items-center justify-center overflow-hidden">
              <img 
                src={perfil.fotoPerfil} 
                alt={perfil.username} 
                className="w-full h-full object-cover" 
              />
            </div>
          </div>

          <div className="flex flex-col gap-5 w-full max-w-md">
            <div className="flex items-center gap-4">
              <span className="font-bold text-xl underline whitespace-nowrap text-white">
                Nombre de usuario:
              </span>
              <div className="flex items-center justify-between bg-transparent border border-white rounded px-4 py-1 flex-grow">
                <span className="text-lg text-white font-bold">{perfil.username}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-serif text-3xl text-gray-300">Sep</span>
              <span className="text-4xl font-bold text-white">{perfil.sep}</span>
            </div>
          </div>
        </div>

        {/* Separador y Cosméticos */}
        <div className="mt-2 border-t border-white/20 pt-6">
          <h2 className="text-2xl font-bold mb-6 text-white uppercase tracking-tighter">Cosméticos:</h2>
          
          <div className="flex flex-row flex-wrap justify-around gap-4">
            {perfil.cosmeticos.map((cosmetic) => (
              <SlotSelectorSkin 
                key={cosmetic.tipo}
                titulo={cosmetic.tipo} 
                imagenPlaceholder={cosmetic.nombre} 
                onClick={() => setTipoEdicion(cosmetic.tipo)}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}