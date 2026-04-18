import Carta from "@/types/carta";
import React from 'react'

export const DisplayCarta = ({ carta , cantidad = 0 }: { carta: Carta, cantidad?: number }) => {
  const getBorderClass = (rareza: string) => {
    switch (rareza.toLowerCase()) {
      case 'comun': return 'border-green-500';
      case 'rara': return 'border-orange-500';
      case 'epica': return 'border-purple-500';
      case 'legendaria': return 'border-yellow-600';
      default: return 'border-gray-500';
    }
  };

  return (
    <div className={`relative flex flex-col bg-black p-4 rounded-lg shadow-md border-4 ${getBorderClass(carta.rareza)} w-70 transition-all duration-300 ${cantidad === 0 ? 'opacity-100 grayscale-[0.4]' : 'opacity-100 scale-105'}`}>
      
      {/* Insignia amarilla de cantidad (x1, x2) */}
      {cantidad > 0 && (
        <div className="absolute -top-3 -right-3 bg-yellow-400 text-black w-10 h-10 rounded-full border-2 border-white flex items-center justify-center font-bold text-xl shadow-lg z-20">
          x{cantidad}
        </div>
      )}

      <h2 className="text-xl font-bold text-white mb-2 text-center truncate">{carta.nombre}</h2>
      
      <div className="self-center w-fit h-fit border border-white/10 rounded bg-gray-900 overflow-hidden">
        <img
          src={carta.imagen}
          alt={carta.nombre}
          className="block"
          loading="lazy"
        />
      </div>
      
      <p className="text-white mt-2 text-sm h-12 overflow-hidden italic text-center">
        "{carta.descripcion}"
      </p>
    </div>
  )
}
