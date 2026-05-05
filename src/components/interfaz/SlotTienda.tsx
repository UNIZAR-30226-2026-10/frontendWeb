'use client';

import ItemTienda from "@/types/itemTienda";
import { formatearNombreItem } from "@/hooks/useTienda";
import React from 'react';

interface SlotTiendaProps {
  item: ItemTienda;
  onSelect: (item: ItemTienda) => void;
  isComprado?: boolean;
}

const SlotTienda: React.FC<SlotTiendaProps> = ({ item, onSelect, isComprado = item.comprado }) => {
  const handleClick = () => {
    if (!isComprado) {
      onSelect(item);
    }
  };

  return (
    <div 
      onClick={handleClick}
      className={`p-4 rounded-2xl font-bold shadow-lg border-2 flex flex-col items-center transition-all relative
        ${isComprado 
          ? 'bg-[#0a1a3c] border-gray-600 opacity-70 cursor-default' 
          : 'bg-[#1a2a6c] border-white/5 hover:border-amber-400 hover:scale-105 cursor-pointer group'
        }`}
    >
      <div className={`w-full aspect-square rounded-xl mb-4 flex items-center justify-center overflow-hidden transition-colors
        ${isComprado ? 'bg-white/5' : 'bg-white/10 group-hover:bg-white/20'}`}
      >
        <img 
          src={item.imagen} 
          alt={item.nombre} 
          className={`w-full h-full object-contain p-2 ${isComprado ? 'grayscale opacity-50' : ''}`}
        />
      </div>
      
      <h2 className="text-white text-center text-sm md:text-base mb-2 whitespace-normal break-words line-clamp-3 uppercase">
        {formatearNombreItem(item.nombre)}
      </h2>
      
      <div className="mt-auto bg-black/30 w-full py-1 rounded-lg border border-white/10 flex justify-center items-center gap-2">
        <span className="text-amber-400 text-xs">SEP</span>
        <span className="text-white">{item.precio}</span>
      </div>

      {isComprado && (
        <div className="absolute inset-0 rounded-2xl flex items-center justify-center bg-black/40">
          <span className="text-white text-sm font-bold uppercase bg-green-600 px-3 py-1 rounded">Comprado</span>
        </div>
      )}
    </div>
  );
};

export default SlotTienda;