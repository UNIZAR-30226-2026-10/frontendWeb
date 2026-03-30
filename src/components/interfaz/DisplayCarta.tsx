import Carta from "@/types/carta";
import React from 'react'

export const DisplayCarta = (props: { carta: Carta }) => {
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
    <div className={`flex flex-col bg-black p-4 rounded-lg shadow-md border-3 ${getBorderClass(props.carta.rareza)} w-60 h-80`}> {/* tamaño fijo rectangular */}
      <h2 className="text-xl font-bold text-white mb-2 text-center truncate">{props.carta.nombre}</h2>
      {/*poner la imagen de la carta*/}
      <div className="flex-1 flex items-center justify-center text-white">placeholder</div>
      <p className="text-white mt-2 text-sm overflow-hidden">{props.carta.descripcion}</p>
    </div>
  )
}
