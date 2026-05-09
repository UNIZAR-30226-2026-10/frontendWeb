import React from "react";

interface DadoPartidaProps {
  onTirar: () => void | Promise<unknown>;
  resultado: number | null;
  resultadoAux: number | null;
  deshabilitado?: boolean;
}

export const DadoPartida: React.FC<DadoPartidaProps> = ({ onTirar, resultado, resultadoAux, deshabilitado }) => {
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
        {resultado !== null && resultado !== 0 && resultadoAux !== null && resultadoAux === 0 && (
          <div className="bg-white/20 backdrop-blur-sm border border-white/30 px-6 py-1 rounded-xl animate-bounce">
            <span className="text-white text-3xl font-black drop-shadow-md">
              {resultado}
            </span>
          </div>
        )} 
        {resultado !== null && resultadoAux !== null && resultadoAux > 0  && (
          <div className="bg-yellow-400/30 backdrop-blur-sm border border-yellow-400/50 px-4 py-1 rounded-xl animate-pulse ml-2">
            <span className="text-yellow-300 text-xl font-bold drop-shadow-md">
              {resultado - resultadoAux}
            <span className="mx-1 text-white">+</span>
              {resultadoAux}
            </span>
           </div>
        )}
        {resultado !== null && resultadoAux !== null && resultadoAux < 0  && (
          <div className="bg-red-500/30 backdrop-blur-sm border border-red-500/50 px-4 py-1 rounded-xl animate-pulse ml-2">
            <span className="text-red-300 text-xl font-bold drop-shadow-md">
              {resultado - resultadoAux}
              <span className="text-white"></span>
              {resultadoAux}
            </span>
           </div>
        )}
      </div>
    </div>
  );
};
