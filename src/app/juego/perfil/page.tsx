/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import SlotSelectorSkin from '@/components/interfaz/SlotSelectorSkin';
import SelectorSkin from '@/components/interfaz/SelectorSkin';
import SelectorNombre from '@/components/interfaz/CajaCambiarNombre'; // Asegúrate de crearlo
import { usePerfil } from '@/hooks/usePerfil';
import { useUser } from '@/context/userContext'; 
import { formatearNombreItem } from '@/hooks/useTienda';
const mostrartipo = (tipo: string): string => {
  const mapa: { [key: string]: string } = {
    'Icono': 'Icono',
    'Skin_Ficha': 'Ficha',
    'Skin_Serpiente': 'Serpiente',
    'Skin_Escalera': 'Escalera'
  };
  return mapa[tipo] || tipo.toLowerCase();
};

export default function Perfil() {
  const { userEmail, logout, setUser } = useUser(); 
  const { 
    perfil, 
    isLoading, 
    error, 
    actualizarEquipamiento, 
    actualizarUsername,
    eliminarUser
  } = usePerfil(userEmail || "");

  const [tipoEdicion, setTipoEdicion] = useState<string | null>(null);
  const [editandoNombre, setEditandoNombre] = useState(false);
  const [mostrarConfirmacionEliminar, setMostrarConfirmacionEliminar] = useState(false);

  const manejarEliminarCuenta = async () => {
    try {
      await eliminarUser(userEmail || "");
      logout(); // Cierra sesión y limpia el contexto
    } catch (err) {
      alert('Error al eliminar la cuenta');
    }
  };

  const manejarCambioNombre = async (nuevoNombre: string) => {
    await actualizarUsername(nuevoNombre);
    // 🔑 Sincronizar el contexto global con el nuevo username
    setUser(userEmail || "", nuevoNombre);
  };

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
    <>
      {/* MODAL: Selector de Skins e Iconos */}
      {tipoEdicion && (
        <SelectorSkin 
          titulo={`Selecciona tu ${mostrartipo(tipoEdicion)}`}
          items={perfil.todosMisCosmeticos.filter(c => c.tipo === tipoEdicion)}
          onClose={() => setTipoEdicion(null)}
          onSelect={(item) => {
            actualizarEquipamiento(item);
            setTipoEdicion(null);
          }}
          skinSeleccionadaId={
            tipoEdicion === 'Icono' 
              ? perfil.fotoPerfil 
              : perfil.cosmeticos.find(c => c.tipo === tipoEdicion)?.nombre
          }
          tipo={tipoEdicion}
        />
      )}

      {/* MODAL: Cambio de Nombre */}
      {editandoNombre && (
        <SelectorNombre 
          nombreActual={perfil.username}
          onClose={() => setEditandoNombre(false)}
          onSave={manejarCambioNombre}
        />
      )}

      {/* MODAL: Confirmación Eliminar Cuenta */}
      {mostrarConfirmacionEliminar && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#283F9F] border-4 border-red-500 rounded-lg p-6 max-w-sm w-full mx-4">
            <h2 className="text-white text-xl font-bold mb-4">¿Eliminar cuenta?</h2>
            <p className="text-white/80 mb-6">Esta acción es irreversible. Se eliminará tu cuenta y todos tus datos.</p>
            <div className="flex gap-4">
              <button
                onClick={() => setMostrarConfirmacionEliminar(false)}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={manejarEliminarCuenta}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    
    <main className="w-full h-full flex flex-col p-4 md:p-6 overflow-y-auto custom-scroll">
      <h1 className="text-white text-center text-3xl font-bold mb-6 shrink-0">Perfil</h1>

      <div className="bg-[#283F9F] border-4 border-yellow-400 rounded-[2rem] p-6 md:p-8 shadow-xl flex flex-col gap-6 w-full max-w-5xl mx-auto">
        
        {/* Estadísticas */}
        <div className="text-2xl font-bold text-white text-right">
          {perfil.victorias}W/{perfil.derrotas}L
        </div>

        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="shrink-0">
            {/* Foto de Perfil Interactiva */}
            <div 
              onClick={() => setTipoEdicion('Icono')}
              className="w-32 h-32 md:w-40 md:h-40 bg-white rounded-full border-4 border-black flex items-center justify-center overflow-hidden cursor-pointer hover:border-amber-400 hover:scale-105 transition-all group relative"
            >
              <img 
                src={`/${perfil.fotoPerfil.toLowerCase().replace(/\s+/g, '_')}.png`} 
                alt={perfil.username} 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <span className="text-white text-xs font-bold uppercase bg-black/60 px-2 py-1 rounded-full">Cambiar</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5 w-full">
            {/* Nombre de Usuario con Botón Editar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <span className="font-bold text-lg md:text-xl underline whitespace-nowrap text-white">
                Usuario:
              </span>
              <div className="flex items-center justify-between bg-transparent border border-white rounded px-4 py-1 flex-grow w-full sm:w-auto group">
                <span className="text-base md:text-lg text-white font-bold truncate">{perfil.username}</span>
                <button 
                  onClick={() => setEditandoNombre(true)}
                  className="text-amber-400 hover:text-amber-200 transition-colors p-1 flex-shrink-0"
                  title="Editar nombre"
                >
                  ✏️
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-serif text-2xl md:text-3xl text-gray-300">Sep</span>
              <span className="text-3xl md:text-4xl font-bold text-white">{perfil.sep}</span>
            </div>

            {/* Botones Logout y Eliminar Cuenta */}
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={logout}
                className="text-white/90 hover:text-amber-400 text-xs md:text-sm font-bold uppercase tracking-widest transition-all flex items-center gap-2 group w-fit"
              >
                <span className="text-lg transition-transform group-hover:scale-110">⎋</span> 
                Cerrar Sesión
              </button>
              <button
                onClick={() => setMostrarConfirmacionEliminar(true)}
                className="text-red-400 hover:text-red-200 text-xs md:text-sm font-bold uppercase tracking-widest transition-all flex items-center gap-2 group w-fit"
              >
                <span className="text-lg transition-transform group-hover:scale-110">🗑️</span>
                Eliminar Cuenta
              </button>
            </div>
          </div>
        </div>

        {/* Sección Cosméticos */}
        <div className="border-t border-white/20 pt-6">
          <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-white">Cosméticos:</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {perfil.cosmeticos.map((cosmetic) => (
              <SlotSelectorSkin 
                key={cosmetic.tipo}
                titulo={mostrartipo(cosmetic.tipo)} 
                imagenUrl={cosmetic.imagen}
                imagenPlaceholder={formatearNombreItem(cosmetic.nombre)} 
                onClick={() => setTipoEdicion(cosmetic.tipo)}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
    </>
  );
}