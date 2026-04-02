import React from 'react';

interface jugador{
    nombreJugador?: string;
    esTurno?: boolean;
    esLider?: boolean;
    iconoJugador?: string;
  colorFichas?: string;
}

interface Props{
    jugadores: jugador[];
}

export const ListaJugadores: React.FC<Props> = ({ jugadores }) => {
    return (

    <div className="w-full bg-[#1E1B4B]/90 backdrop-blur-sm p-2 rounded-xl border border-white/20 shadow-lg">
      <h3 className="text-white text-center font-bold text-sm mb-1.5 tracking-wider uppercase drop-shadow-md">
        Turno
      </h3>
      
      <div className="flex flex-col gap-1">
        {jugadores.map((jugador) => (
          <div
            key={jugador.nombreJugador}
            className={`flex items-center gap-2 px-2 py-1 rounded-full border transition-all duration-300 ${
              jugador.esTurno 
                ? 'bg-[#EAB308] border-white scale-105 shadow-[0_0_8px_rgba(234,179,8,0.5)]' 
                : 'bg-[#1E1B4B] border-transparent opacity-80'
            }`}
          >
            <div className="relative w-6 h-6 shrink-0 rounded-full border border-black bg-white flex items-center justify-center overflow-visible">
                <span className="text-xs drop-shadow-sm">🐍</span>
              {jugador.esLider && (
                <span className="absolute -top-2 -right-1 text-xs drop-shadow-md rotate-12 z-10">👑</span>
              )}
            </div>

            <div className="flex items-center gap-2 min-w-0 flex-1">
              <span className={`inline-block w-3 h-3 rounded-full border border-white/80 shrink-0 ${jugador.colorFichas ?? 'bg-white'}`} />
              <span className={`font-black text-xs lg:text-sm truncate ${jugador.esTurno ? 'text-white drop-shadow-md' : 'text-gray-200'}`}>
                {jugador.nombreJugador}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
    );
}