"use client";
import React, { useState } from "react";

interface HuecoJugadorProps {
    estaOcupado: boolean;
    esLider?: boolean;
    nomJugador?: string;
    iconoJugador?: string;
  esBot?: boolean;
    onAgregarBot?: () => void;
  onEliminarBot?: () => void;
}

const HuecoJugador: React.FC<HuecoJugadorProps> = ({
    estaOcupado,
    esLider,
    nomJugador,
    iconoJugador,
  esBot,
  onAgregarBot,
  onEliminarBot
}) => {

  const resolverRutaIcono = (icono?: string): string => {
    if (!icono || icono.trim() === '' || icono.toLowerCase() === 'null') {
      return '/icono_default.png';
    }

    // Si ya viene como URL o ruta absoluta, se usa tal cual.
    if (icono.startsWith('http://') || icono.startsWith('https://') || icono.startsWith('/')) {
      return icono;
    }

    // El backend devuelve el nombre del cosmetico (ej: icono_default, icono_W).
    return `/${icono.replace(/\s+/g, '_')}.png`;
  };
    
    if(!estaOcupado) {
        return (
            <button
                className="bg-[#eab308] w-60 h-60 rounded-4xl flex flex-col items-center justify-center text-white text-3xl font-bold font-sans hover:bg-[#d4a107] transition-colors"
                onClick={() => {
                    if (onAgregarBot) {
                        onAgregarBot();
                    }
                }}
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
            <img
              src={resolverRutaIcono(iconoJugador)}
              alt={nomJugador}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = '/icono_default.png';
              }}
            />
          ) : (
            <img
              src="/icono_default.png"
              alt="Icono por defecto"
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <span className="text-white text-3xl font-bold font-sans">{nomJugador}</span>
        {esBot && onEliminarBot && (
          <button
            className="mt-3 rounded-full bg-red-600 px-4 py-2 text-sm font-bold text-white shadow-lg transition-colors hover:bg-red-500"
            onClick={onEliminarBot}
          >
            Eliminar bot
          </button>
        )}
      </div>
    );
}

export default HuecoJugador;