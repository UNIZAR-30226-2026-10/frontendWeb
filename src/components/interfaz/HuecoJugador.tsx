"use client";
import React, { useState } from "react";

interface HuecoJugadorProps {
    estaOcupado: boolean;
    esLider?: boolean;
    nomJugador?: string;
    iconoJugador?: string;
}

const HuecoJugador: React.FC<HuecoJugadorProps> = ({estaOcupado,esLider,nomJugador,iconoJugador}) => {
    
    const [hayBot,setHayBot] = useState(false);
    if(hayBot) {
        return (
            <div className="bg-[#eab308] w-70 h-70 rounded-4xl flex flex-col items-center justify-center text-white text-3xl font-bold font-sans">
                <button
                    className="absolute top-0 right-0 text-white text-xl font-bold"
                    onClick={() => setHayBot(false)}
                >
                  {/*TODO: arreglar para que salga el botón X correctamente y configurarlo tambien para echar jugadores*/}
                    X
                </button>
                <div>Bot</div>
            </div>
        );
    }

    if(!estaOcupado) {
        return (
            <button
                className="bg-[#eab308] w-70 h-70 rounded-4xl flex flex-col items-center justify-center text-white text-3xl font-bold font-sans"
                onClick={() => setHayBot(true)}
            >
                <div>+</div>
                <span>Añadir Bot</span>
            </button>
        );
    }

    return (
      <div className="bg-[#eab308] w-70 h-70 rounded-4xl flex flex-col items-center justify-center relative">
        {esLider && (
          <div className="-top-6 left-0 text-6xl text-white transform -rotate-12">(corona)</div>
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

export default HuecoJugador;