import React from 'react';

export const MazoVisual: React.FC = () => {
  return (
    <div className="absolute bottom-15 left-15 z-10 flex items-end">
      {/* Contenedor de las cartas apiladas */}
      <div className="relative w-30 h-40">
        {/* Carta de fondo (decorativa para dar efecto de mazo) */}
        <div className="absolute bottom-1 left-1 w-full h-full bg-black border-2 border-purple-600 rounded-md shadow-sm transform -rotate-3"></div>
        
        {/* Carta principal del mazo */}
        <div className="absolute bottom-0 left-0 w-full h-full bg-black border-2 border-blue-600 rounded-md shadow-md flex flex-col items-center justify-start gap-1 pt-2">
          {/* Diseño de la parte trasera de la carta */}
          <h1 className="text-[10px] font-bold text-white leading-none text-center">Carpintero</h1>
          <div className="w-20 h-20 border border-gray-400 rounded-sm bg-white" />
          <h1 className="text-[8px] font-bold text-white leading-none text-center">Crea una escalera en la casilla elegida</h1>
        </div>
      </div>
    </div>
  );
};