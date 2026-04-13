'use client';
import React from 'react';

interface SlotProps {
  titulo: string;
  nombreItem: string;
  onClick: () => void;
}

const SlotSelectorSkin: React.FC<SlotProps> = ({ titulo, nombreItem, onClick }) => {
  return (
    <div onClick={onClick} className="flex flex-col items-center gap-3 cursor-pointer group">
      <span className="text-amber-400 font-bold text-sm uppercase tracking-widest">{titulo}</span>
      
      {/* CUADRO BLANCO */}
      <div className="w-32 h-32 bg-white border-4 border-white/10 rounded-2xl flex items-center justify-center shadow-lg group-hover:border-amber-400 group-hover:scale-105 transition-all">
        <span className="text-gray-300 text-[10px] font-bold uppercase">Imagen</span>
      </div>

      <span className="text-white font-bold text-xs uppercase opacity-80 group-hover:opacity-100">{nombreItem}</span>
    </div>
  );
};

export default SlotSelectorSkin;