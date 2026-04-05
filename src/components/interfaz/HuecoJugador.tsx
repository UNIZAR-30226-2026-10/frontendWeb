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
        <div className="bg-[#eab308] w-60 h-60 rounded-4xl relative flex items-center justify-center text-white text-3xl font-bold font-sans">
                
                <div>Bot</div>
               <button
               className="absolute left-1/2 top-2/3 -translate-x-1/2 translate-y-6 text-xl font-bold underline font-sans"
                    onClick={() => setHayBot(false)}
                >
                  {/*TODO: arreglar para que salga el botón X correctamente y configurarlo tambien para echar jugadores*/}
                    Eliminar
                </button>
            </div>
        );
    }

    if(!estaOcupado) {
        return (
            <button
                className="bg-[#eab308] w-60 h-60 rounded-4xl flex flex-col items-center justify-center text-white text-3xl font-bold font-sans"
                onClick={() => setHayBot(true)}
            >
                <div>+</div>
                <span>Añadir Bot</span>
            </button>
        );
    }

    return (
      <div className="bg-[#eab308] w-60 h-60 rounded-4xl flex flex-col items-center justify-center relative">
        {esLider && (
          <div className="-top-6 left-0 text-6xl text-white transform -rotate-12">👑</div>
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