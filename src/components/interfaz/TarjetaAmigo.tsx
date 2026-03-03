'use client';
import { useState } from 'react';
import AmigoOpciones from './AmigoOpciones';

const Avatar = ({ nombre, estado, avatar }: { nombre: string; estado: string; avatar: string }) => (
  <div className="flex items-center gap-3">
    <div className="w-10 h-10 bg-indigo-900 rounded-full flex items-center justify-center text-xl shadow-inner">
      {avatar}
    </div>
    <div className="flex flex-col">
      <span className="text-white text-sm font-semibold leading-tight">{nombre}</span>
      <span className={`text-xs ${estado === 'online' ? 'text-green-400' : 'text-grey-400'}`}>
        {estado}
      </span>
    </div>
  </div>
);

interface AmigoProps {
  amigo: { nombre: string; estado: string; avatar: string };
}

const TarjetaAmigo = ({ amigo }: AmigoProps) => {
  const [showOptions, setShowOptions] = useState(false);
  
  // Definimos el color de fondo basado en el estado
  const backgroundColor = amigo.estado === 'invitado' ? 'bg-sky-500' : 'bg-[#121943] hover:bg-[#1c2661]';

  return (
    <div className="flex flex-col w-full">
      {/* Contenedor principal para que las opciones aparezcan debajo */}
      <div className={`flex flex-col p-2 rounded-md transition-all duration-300 ${backgroundColor}`}>
        
        {/* Fila donde se ven el nombre y el avatar del amigo */}
        <div className="flex items-center justify-between w-full">
          <Avatar nombre={amigo.nombre} estado={amigo.estado} avatar={amigo.avatar} />
          {/* Boton para mostrar/ocultar opciones */}
          <button 
            onClick={() => setShowOptions(!showOptions)}
            className={`text-white transition-transform duration-200 p-1 ${showOptions ? 'rotate-90' : 'rotate-0'}`}
          >
            ➔
          </button>
        </div>

        {/* Funcion que se ejecuta cuando se pulsa el boton de la flecha */}
        {showOptions && (
          <div className="mt-2 w-full">
             <AmigoOpciones />
          </div>
        )}
      </div>
    </div>
  );
};

export default TarjetaAmigo;