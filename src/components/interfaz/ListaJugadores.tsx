import React from 'react';

interface jugador{
    nombreJugador?: string;
    esTurno?: boolean;
    esLider?: boolean;
    iconoJugador?: string;
}

interface Props{
    jugadores: jugador[];
}

export const ListaJugadores: React.FC<Props> = ({ jugadores }) => {
    return (
    <div className="w-full bg-[#1E1B4B]/80 backdrop-blur-sm p-4 rounded-3xl border-2 border-white/10 shadow-xl">
      <h3 className="text-white text-center font-bold text-2xl mb-4 tracking-wider uppercase drop-shadow-md">
        Turno
      </h3>
      
      <div className="flex flex-col gap-3">
        {jugadores.map((jugador) => (
          <div
            key={jugador.nombreJugador}
            className={`flex items-center gap-4 px-3 py-2 rounded-full border-2 transition-all duration-300 ${
              jugador.esTurno 
                ? 'bg-[#EAB308] border-white scale-105 shadow-[0_0_15px_rgba(234,179,8,0.5)]' 
                : 'bg-[#1E1B4B] border-transparent opacity-80 hover:opacity-100'
            }`}
          >
            {/* Contenedor del Avatar */}
            <div className="relative w-12 h-12 shrink-0 bg-white rounded-full border-2 border-black flex items-center justify-center overflow-visible">
                <span className="text-2xl drop-shadow-sm">🐍</span>
              {/* Corona */}
              {jugador.esLider && (
                <span className="absolute -top-4 -right-2 text-xl drop-shadow-md rotate-12 z-10">👑</span>
              )}
            </div>

            {/* Nombre del Jugador */}
            <span className={`font-black text-xl truncate ${jugador.esTurno ? 'text-white drop-shadow-md' : 'text-gray-200'}`}>
              {jugador.nombreJugador}
            </span>
          </div>
        ))}
      </div>
    </div>
    );
}