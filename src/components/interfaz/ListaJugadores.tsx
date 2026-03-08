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
    <div className="absolute top-2 left-10 z-10 w-44 bg-black/40 backdrop-blur-sm p-3 rounded-xl border border-white/20 shadow-2xl">
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
            {/* Contenedor del Avatar (Serpiente) */}
            <div className="relative w-10 h-10 bg-white rounded-full border-2 border-black flex items-center justify-center overflow-visible">
                <span className="text-2xl">🐍</span>
              {/* Corona si es "Tú" o el líder */}
              {jugador.esLider && (
                <span className="absolute -top-5 -right-1 text-xl drop-shadow-md rotate-12">👑</span>
              )}
            </div>

            {/* Nombre del Jugador */}
            <span className={`font-black text-lg ${jugador.esTurno ? 'text-white' : 'text-white'}`}>
              {jugador.nombreJugador}
            </span>
          </div>
        ))}
      </div>
    </div>
    );
}