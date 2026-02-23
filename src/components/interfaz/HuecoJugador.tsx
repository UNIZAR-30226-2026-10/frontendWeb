import React from "react";

interface HuecoJugadorProps {
    estaOcupado: boolean;
    esLider: boolean;
    nomJugador: string;
    iconoJugador: string;
    onClick: () => void;
}

const HuecoJugador: React.FC<HuecoJugadorProps> = ({
    estaOcupado,
    esLider,
    nomJugador,
    iconoJugador,
    onClick,
}) => {
    if(!estaOcupado) {
        return (
            <button
                className="bg-[#eab308] w-56 h-48 rounded-4xl flex flex-col items-center justify-center text-white text-3xl font-bold font-sans"
                onClick={onClick}
            >
                <div>+</div>
                <span>Añadir jugador</span>
            </button>
        );
    }

    return (
      <div className="bg-[#eab308] w-56 h-48 rounded-4xl flex flex-col items-center justify-center relative">
        {esLider && (
          <div className="-top-6 left-0 text-6xl transform -rotate-12">(corona)</div>
        )}
        <div className="bg-white rounded-full w-24 h-24 flex items-center justify-center mb-3 border-4 border-black overflow-hidden">
          {iconoJugador ? (
            <img src={iconoJugador} alt={nomJugador} className="w-full h-full" />
          ) : (
            <div className="w-full h-full bg-gray-300"></div>
          )}
        </div>
        <span className="text-white text-3xl font-bold font-sans">{nomJugador}</span>
      </div>
    );
}