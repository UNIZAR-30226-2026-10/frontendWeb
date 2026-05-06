"use client";
import React, { useState } from "react";

interface TableroOption {
  id: string;
  nombre: string;
}

interface SelectorTableroProps {
  tableroSeleccionado: string;
  onTableroSeleccionado: (tableroId: string) => void;
  tablerosDisponibles?: string[];
}

const SelectorTablero: React.FC<SelectorTableroProps> = ({ 
  tableroSeleccionado, 
  onTableroSeleccionado,
  tablerosDisponibles
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const listaTableros = tablerosDisponibles && tablerosDisponibles.length > 0
    ? tablerosDisponibles
    : ["Tablero 1", "Tablero Clásico", "Tablero Oscuro", "Tablero Neón", "Tablero Retro"];

  const seleccionarYSalir = (tableroId: string) => {
    onTableroSeleccionado(tableroId);
    setIsOpen(false);
  };

  return (
    <>
      {/* BOTÓN DISPARADOR (En el Lobby) */}
      <div 
        onClick={() => setIsOpen(true)}
        className="group bg-[#283F9F] border-[2px] border-[#EFB810] rounded-xl p-3 w-full aspect-square max-h-[220px] flex flex-col items-center shadow-lg cursor-pointer transition-all z-10"
      >
        <p className="font-bold text-xl text-white mb-2 self-start ml-1">Tablero</p>

        {/* CUADRO BLANCO CON EL LÁPIZ */}
        <div className="w-full flex-1 bg-white rounded-sm shadow-inner relative overflow-hidden flex flex-col items-center justify-center border border-black/10">
            <img 
              src={`/${tableroSeleccionado}.jpg`} 
              alt={tableroSeleccionado} 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
              onError={(e) => {
                (e.target as HTMLImageElement).style.opacity = "0";
              }}
            />
            {/* Solo aquí mostramos el emoji */}
            <span className="text-6xl transform group-hover:rotate-12 group-hover:scale-110 transition-transform duration-200 select-none z-10 drop-shadow">
              ✏️
            </span>
        </div>
      </div>

      {/* OVERLAY DEL SELECTOR (Confinado al área azul del Main) */}
      {isOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-200">
          {/* Fondo oscuro traslúcido */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          {/* CUADRO DE SELECCIÓN */}
          <div className="relative bg-[#283F9F] border-4 border-yellow-400 rounded-3xl p-6 md:p-8 shadow-2xl flex flex-col max-w-4xl w-full max-h-[85%] animate-in zoom-in-95 duration-200">
            
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-white text-2xl font-bold uppercase tracking-wide">Selecciona un Tablero</h2>
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="text-white/40 hover:text-white font-bold text-2xl transition-colors"
                >
                  ✕
                </button>
            </div>
            
            {/* GRID DE OPCIONES */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 overflow-y-auto p-2 pr-4 flex-1 custom-scroll">
              {listaTableros.map((tableroNombre) => (
                <div
                  key={tableroNombre}
                  onClick={() => seleccionarYSalir(tableroNombre)}
                  className={`cursor-pointer rounded-2xl p-3 border-4 transition-all flex flex-col ${
                    tableroNombre === tableroSeleccionado 
                    ? "border-yellow-400 bg-yellow-400/10 scale-[1.02]" 
                    : "border-transparent bg-white/5 hover:bg-white/10"
                  }`}
                >
                  {/* CUADRO DE VISTA PREVIA CON IMAGEN O PLACEHOLDER */}
                  <div className="w-full aspect-video bg-white rounded-lg shadow-md border border-gray-200 relative overflow-hidden flex items-center justify-center">
                      <img 
                        src={`/${tableroNombre}.jpg`} 
                        alt={tableroNombre} 
                        className="absolute inset-0 w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                      <span className="text-gray-400 font-bold text-xs uppercase tracking-widest select-none pointer-events-none">
                        Vista Previa
                      </span>
                  </div>
                  
                  {/* NOMBRE DEL TABLERO */}
                  <div className="pt-4 text-center">
                    <p className={`font-bold text-lg ${tableroNombre === tableroSeleccionado ? "text-yellow-400" : "text-white"}`}>
                        {tableroNombre}
                    </p>
                    {tableroNombre === tableroSeleccionado && (
                      <span className="text-[10px] text-yellow-400 font-bold uppercase">Seleccionado</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SelectorTablero;