/* eslint-disable @next/next/no-img-element */
'use client';
import React from 'react';

// Definimos la interfaz exactamante como la usa el Perfil
interface SlotSelectorSkinProps {
  titulo: string;
  imagenUrl?: string; // URL de la imagen del cosmético
  imagenPlaceholder?: string; // Fallback: el nombre de la skin que se verá en el cuadro blanco
  onClick: () => void;       // La función para abrir el selector
}

const SlotSelectorSkin: React.FC<SlotSelectorSkinProps> = ({ titulo, imagenUrl, imagenPlaceholder, onClick }) => {
  return (
    <div 
      onClick={onClick} 
      className="flex flex-col items-center cursor-pointer group gap-2"
    >
      {/* Título fuera de la caja */}
      <span className="text-white font-bold text-xs uppercase tracking-widest">{titulo}</span>

      {/* Caja del cosmético */}
      <div className="p-3 rounded-xl shadow-lg border-2 bg-[#1a2a6c] border-white/5 group-hover:border-amber-400 group-hover:scale-105 transition-all">
        <div className="w-36 h-28 rounded-lg flex items-center justify-center overflow-hidden bg-white/10 group-hover:bg-white/20 transition-colors">
          {imagenUrl ? (
            <img 
              src={imagenUrl} 
              alt={titulo} 
              className="w-full h-full object-contain p-2" 
            />
          ) : (
            <span className="text-white/50 text-xs font-bold text-center px-2 uppercase">
              {imagenPlaceholder}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default SlotSelectorSkin;