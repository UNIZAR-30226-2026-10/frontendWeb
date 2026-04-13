'use client';

import ItemTienda from "@/types/itemTienda";
import React from 'react';

interface SlotTiendaProps {
  item: ItemTienda;
  onSelect: (item: ItemTienda) => void;
}

const SlotTienda: React.FC<SlotTiendaProps> = ({ item, onSelect }) => {
  return (
    <div 
      onClick={() => onSelect(item)}
      className="bg-[#1a2a6c] p-4 rounded-2xl font-bold shadow-lg border-2 border-white/5 hover:border-amber-400 hover:scale-105 transition-all cursor-pointer group flex flex-col items-center"
    >
      <div className="w-full aspect-square bg-white/10 rounded-xl mb-4 flex items-center justify-center text-5xl group-hover:bg-white/20 transition-colors">
        {/* Aquí puedes usar item.imagen si existe */}
        🎭
      </div>
      
      <h2 className="text-white text-center text-sm md:text-base mb-2 line-clamp-2 uppercase">
        {item.nombre}
      </h2>
      
      <div className="mt-auto bg-black/30 w-full py-1 rounded-lg border border-white/10 flex justify-center items-center gap-2">
        <span className="text-amber-400 text-xs">SEP</span>
        <span className="text-white">{item.precio}</span>
      </div>
    </div>
  );
};

export default SlotTienda;