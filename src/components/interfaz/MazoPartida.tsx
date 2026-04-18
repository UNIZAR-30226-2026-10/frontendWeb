import React from 'react';
import Carta from '../../types/carta';
// 1. Definimos la forma de las props que el componente va a recibir
interface MazoVisualProps {
  onSelectCarta: (carta: Carta) => void;
}

// 2. Le decimos a React.FC que use esas props: React.FC<MazoVisualProps>
export const MazoVisual: React.FC<MazoVisualProps> = ({ onSelectCarta }) => {
  const mano = [
    { id: 1, nombre: "Moises", img: "/moises2.png", efecto: "Te saltas el bloqueo", tipo: "Acción", rareza: "Común", descripcion: "Carta que permite saltar bloqueos", vacia: false },
    { id: 2, nombre: "Moises", img: "/moises2.png", efecto: "Te saltas el bloqueo", tipo: "Acción", rareza: "Común", descripcion: "Carta que permite saltar bloqueos", vacia: false },
    { id: 3, nombre: "Moises", img: "/moises2.png", efecto: "Te saltas el bloqueo", tipo: "Acción", rareza: "Común", descripcion: "Carta que permite saltar bloqueos", vacia: false },
    { id: 4, nombre: "", img: "", efecto: "", tipo: "", rareza: "", descripcion: "", vacia: true }, // Hueco vacío
  ];

  return (
    <div className="w-full grid grid-cols-2 gap-3 p-1">
      
      {mano.map((carta) => {
        if (carta.vacia) {
          return (
            <div 
              key={carta.id} 
              className="w-full aspect-[2/3] border-2 border-dashed border-white/40 rounded-lg flex items-center justify-center bg-black/20"
            >
              <span className="text-white/30 text-xs font-bold uppercase tracking-widest">+ Carta</span>
            </div>
          );
        }

        return (
          <div 
            key={carta.id} 
            // 3. Añadimos el evento onClick para avisar al padre qué carta se eligió
            onClick={() => onSelectCarta(carta)}
            className="w-full aspect-[2/3] bg-black border-2 border-blue-600 rounded-lg shadow-md flex flex-col items-center justify-between p-2 hover:scale-105 transition-transform cursor-pointer hover:border-blue-400 hover:shadow-[0_0_15px_rgba(37,99,235,0.6)] z-10"
          >
            {/* Título de la carta */}
            <h1 className="text-[10px] xl:text-xs font-bold text-white leading-none text-center truncate w-full">
              {carta.nombre}
            </h1>
            
            {/* Imagen */}
            <div className="flex-1 w-full relative flex items-center justify-center py-1">
              <img
                src={carta.img}
                alt={carta.nombre}
                className="max-h-full max-w-full object-contain drop-shadow-md"
              />
            </div>
            
            {/* Efecto de la carta */}
            <h1 className="text-[8px] xl:text-[10px] font-medium text-blue-200 leading-tight text-center">
              {carta.efecto}
            </h1>
          </div>
        );
      })}

    </div>
  );
};