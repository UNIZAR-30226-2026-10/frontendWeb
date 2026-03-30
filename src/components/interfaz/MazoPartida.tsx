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
          <h1 className="text-[10px] font-bold text-white leading-none text-center">Moises</h1>
          <img
				src="/moises2.png"
				alt="Dado"
				className="h-25 w-25 object-contain drop-shadow-lg"
			/>
          <h1 className="text-[8px] font-bold text-white leading-none text-center">Te saltas el bloqueo</h1>
        </div>
      </div>
    </div>
  );
};