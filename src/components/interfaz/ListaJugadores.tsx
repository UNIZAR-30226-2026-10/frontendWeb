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
    // Hemos quitado "absolute top-2 left-10 z-10 w-44" y puesto "w-full relative z-10"
    <div className="w-full relative z-10 bg-black/40 backdrop-blur-sm p-3 rounded-xl border border-white/20 shadow-2xl">
      <h3 className="text-white text-center font-bold text-xl mb-2 tracking-wide uppercase">
        Turno
      </h3>
      
      <div className="flex flex-col gap-2">
        {jugadores.map((jugador) => (
          <div
            key={jugador.nombreJugador}
            className={`flex items-center gap-2 px-2 py-1.5 rounded-full border-2 transition-all ${
              jugador.esTurno 
                ? 'bg-[#EAB308] border-white scale-105 shadow-lg' // Dorado si es su turno
                : 'bg-[#1E1B4B] border-transparent opacity-90'    // Azul oscuro si no
            }`}
          >
            <div className="relative w-6 h-6 shrink-0 rounded-full border border-black bg-white flex items-center justify-center overflow-visible">
                <span className="text-xs drop-shadow-sm">🐍</span>
              {jugador.esLider && (
                <span className="absolute -top-5 -right-1 text-xl drop-shadow-md rotate-12">👑</span>
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