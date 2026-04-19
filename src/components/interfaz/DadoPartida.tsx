import React from "react";

interface DadoPartidaProps {
  onTirar: () => void;
  resultado: number | null;
  deshabilitado?: boolean;
}

export const DadoPartida: React.FC<DadoPartidaProps> = ({ onTirar, resultado, deshabilitado }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div 
        onClick={() => !deshabilitado && onTirar()}
        className={`flex items-center justify-center transition-all ${deshabilitado ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-110 active:scale-95'}`}
      >
        <img
          src="/dado.jpg"
          alt="Dado"
          className="w-32 h-32 lg:w-40 lg:h-40 object-contain drop-shadow-2xl"
        />
      </div>
      
      {/* Contenedor del resultado */}
      <div className="h-12 flex items-center justify-center">
        {resultado !== null && (
          <div className="bg-white/20 backdrop-blur-sm border border-white/30 px-6 py-1 rounded-xl animate-bounce">
            <span className="text-white text-3xl font-black drop-shadow-md">
              {resultado}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
