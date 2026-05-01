'use client';

import React, { useState } from 'react';
import SlotSelectorSkin from '@/components/interfaz/SlotSelectorSkin';
import SelectorSkin from '@/components/interfaz/SelectorSkin';
import SelectorNombre from '@/components/interfaz/CajaCambiarNombre'; // Asegúrate de crearlo
import { usePerfil } from '@/hooks/usePerfil';
import { useUser } from '@/context/userContext'; 

export default function Perfil() {
  const { userEmail, logout } = useUser(); 
  const { 
    perfil, 
    isLoading, 
    error, 
    actualizarEquipamiento, 
    actualizarUsername 
  } = usePerfil(userEmail || "");

  const [tipoEdicion, setTipoEdicion] = useState<string | null>(null);
  const [editandoNombre, setEditandoNombre] = useState(false);

  if (!userEmail) return null;

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
      
      {/* MODAL: Selector de Skins e Iconos */}
      {tipoEdicion && (
        <SelectorSkin 
          titulo={`Selecciona tu ${tipoEdicion}`}
          items={perfil.todosMisCosmeticos.filter(c => c.tipo === tipoEdicion)}
          onClose={() => setTipoEdicion(null)}
          onSelect={(item) => {
            actualizarEquipamiento(item);
            setTipoEdicion(null);
          }}
          skinSeleccionadaId={
            tipoEdicion === 'Icono' 
              ? perfil.fotoPerfil 
              : perfil.cosmeticos.find(c => c.tipo === tipoEdicion)?.id
          }
        />
      )}

      {/* MODAL: Cambio de Nombre */}
      {editandoNombre && (
        <SelectorNombre 
          nombreActual={perfil.username}
          onClose={() => setEditandoNombre(false)}
          onSave={actualizarUsername}
        />
      )}

      <h1 className="text-white text-3xl font-bold mb-6 shrink-0">Perfil</h1>

      <div className="relative bg-[#283F9F] border-4 border-yellow-400 rounded-[2rem] p-8 shadow-xl flex flex-col gap-6 max-w-5xl w-full">
        
        {/* Estadísticas */}
        <div className="absolute top-6 right-8 text-2xl font-bold text-white">
          {perfil.victorias}W/{perfil.derrotas}L
        </div>

        <div className="flex flex-row items-center gap-8 mt-4">
          <div className="relative shrink-0">
            {/* Foto de Perfil Interactiva */}
            <div 
              onClick={() => setTipoEdicion('Icono')}
              className="w-40 h-40 bg-white rounded-full border-4 border-black flex items-center justify-center overflow-hidden cursor-pointer hover:border-amber-400 hover:scale-105 transition-all group relative"
            >
              <img 
                src={`/iconos/${perfil.fotoPerfil}`} 
                alt={perfil.username} 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <span className="text-white text-xs font-bold uppercase bg-black/60 px-2 py-1 rounded-full">Cambiar</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5 w-full max-w-md">
            {/* Nombre de Usuario con Botón Editar */}
            <div className="flex items-center gap-4">
              <span className="font-bold text-xl underline whitespace-nowrap text-white">
                Nombre de usuario:
              </span>
              <div className="flex items-center justify-between bg-transparent border border-white rounded px-4 py-1 flex-grow group">
                <span className="text-lg text-white font-bold">{perfil.username}</span>
                <button 
                  onClick={() => setEditandoNombre(true)}
                  className="text-amber-400 hover:text-amber-200 transition-colors p-1"
                  title="Editar nombre"
                >
                  ✏️
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-serif text-3xl text-gray-300">Sep</span>
              <span className="text-4xl font-bold text-white">{perfil.sep}</span>
            </div>
          </div>
        </div>

        {/* Botón Logout */}
        <div className="flex justify-end -mb-4 pr-2">
          <button
            onClick={logout}
            className="text-white/90 hover:text-amber-400 text-sm font-bold uppercase tracking-widest transition-all flex items-center gap-2 group"
          >
            <span className="text-lg transition-transform group-hover:scale-110">⎋</span> 
            Cerrar Sesión
          </button>
        </div>

        {/* Sección Cosméticos */}
        <div className="mt-2 border-t border-white/20 pt-6">
          <h2 className="text-2xl font-bold mb-6 text-white">Cosméticos:</h2>
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