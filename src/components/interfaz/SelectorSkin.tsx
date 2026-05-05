'use client';
import React from 'react';

import { Cosmetico } from '@/types/perfil';

interface Props {
  titulo: string;
  items: Cosmetico[];
  onClose: () => void;
  onSelect: (item: Cosmetico) => void;
  skinSeleccionadaId?: string;
}

const SelectorSkin: React.FC<Props> = ({ titulo, items, onClose, onSelect, skinSeleccionadaId }) => {
  return (
    <div className="absolute inset-0 z-[100] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-[#283F9F] border-4 border-yellow-400 rounded-3xl p-6 md:p-8 shadow-2xl flex flex-col max-w-4xl w-full max-h-[85%]">
        <div className="flex justify-between items-center mb-6 text-white">
          <h2 className="text-2xl font-bold uppercase">Equipar {titulo}</h2>
          <button onClick={onClose} className="text-white/40 hover:text-white font-bold text-2xl">✕</button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 overflow-y-auto p-2 pr-4 custom-scroll">
          {items.map((skin) => (
            <div
              key={skin.id}
              onClick={() => onSelect(skin)}
              className={`cursor-pointer rounded-2xl p-4 border-4 transition-all flex flex-col items-center gap-3 ${
                skin.nombre === skinSeleccionadaId ? "border-yellow-400 bg-yellow-400/10" : "border-transparent bg-black/20 hover:bg-black/40"
              }`}
            >
              <div className="w-full aspect-square bg-white rounded-xl flex items-center justify-center text-gray-200 text-[10px] font-bold uppercase overflow-hidden">
                {skin.imagen ? (
                  <img src={skin.imagen} alt={skin.nombre} className="w-full h-full object-contain p-2" />
                ) : (
                  <span>Imagen</span>
                )}
              </div>
              <p className="font-bold text-xs text-center text-white uppercase">{skin.nombre}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectorSkin;