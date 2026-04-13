'use client';

import React from 'react';
import ItemTienda from "@/types/itemTienda";

interface ConfirmarCompraProps {
  item: ItemTienda | null;
  onClose: () => void;
  onConfirm: (item: ItemTienda) => void;
}

const ConfirmarCompra: React.FC<ConfirmarCompraProps> = ({ item, onClose, onConfirm }) => {
  if (!item) return null;

  return (
    /* CAMBIO CLAVE: absolute en lugar de fixed e inset-0 */
    <div className="absolute inset-0 z-[100] flex items-center justify-center p-4">
      
      {/* Fondo oscuro: también absolute para que no se salga del main */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm" 
        onClick={onClose} 
      />

      {/* Contenedor del Modal: Igual que antes pero relativo al absolute */}
      <div className="relative bg-[#283F9F] border-4 border-amber-400 rounded-3xl p-6 md:p-8 max-w-2xl w-full shadow-2xl animate-in zoom-in-95 duration-200">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white text-2xl transition-colors"
        >
          ✕
        </button>

        <div className="flex flex-col md:flex-row gap-8 items-center">
          
          <div className="w-full md:w-1/2 aspect-square bg-white/10 rounded-2xl border-2 border-white/20 flex items-center justify-center overflow-hidden">
             <div className="text-6xl">🎭</div> 
          </div>

          <div className="w-full md:w-1/2 flex flex-col justify-between space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-white uppercase tracking-tight leading-none">
                {item.nombre}
              </h2>
              <p className="text-amber-400 text-sm font-bold mt-2 uppercase tracking-widest">Recompensa Exclusiva</p>
            </div>

            <div className="bg-black/20 p-4 rounded-xl border border-white/10">
              <p className="text-white/70 text-xs uppercase font-bold mb-1">Precio de adquisición:</p>
              <p className="text-3xl font-bold text-white">
                {item.precio} <span className="text-amber-400 text-xl">SEP</span>
              </p>
            </div>

            <button
              onClick={() => onConfirm(item)}
              className="w-full bg-green-500 hover:bg-green-400 text-white font-bold py-4 rounded-xl border-b-4 border-green-700 active:border-b-0 active:translate-y-1 transition-all text-xl uppercase shadow-lg"
            >
              Confirmar Compra
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmarCompra;