"use client";
import React, { useState } from "react";

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
    : [];

  const seleccionarYSalir = (tableroId: string) => {
    onTableroSeleccionado(tableroId);
    setIsOpen(false);
  };

  return (
    <>
      {/* BOTÓN DISPARADOR (En el Lobby) */}
      <div 
        onClick={() => setIsOpen(true)}
        className="group bg-[#283F9F] border-[2px] border-[#EFB810] rounded-xl p-3 w-full aspect-square max-h-[220px] flex flex-col items-center justify-between shadow-lg cursor-pointer transition-all z-10"
      >
        <p className="font-bold text-xl text-white self-start ml-1">Tablero</p>

        <div className="w-full flex-1 rounded-2xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center px-4 text-center flex-col gap-2">
          <span className="text-6xl transform group-hover:rotate-12 group-hover:scale-110 transition-transform duration-200 select-none z-10 drop-shadow">
            ✏️
          </span>
          <div>
            <p className="text-white font-bold text-lg leading-tight">{tableroSeleccionado || 'Selecciona un tablero'}</p>
            <p className="text-white/60 text-xs uppercase tracking-widest mt-2">Seleccionar tablero</p>
          </div>
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
            
            {listaTableros.length === 0 ? (
              <div className="flex-1 flex items-center justify-center text-white/70 text-sm">
                No hay tableros disponibles.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 overflow-y-auto p-2 pr-4 flex-1 custom-scroll">
                {listaTableros.map((tableroNombre) => (
                  <div
                    key={tableroNombre}
                    onClick={() => seleccionarYSalir(tableroNombre)}
                    className={`cursor-pointer rounded-2xl p-4 border-4 transition-all flex flex-col ${
                      tableroNombre === tableroSeleccionado 
                      ? "border-yellow-400 bg-yellow-400/10 scale-[1.02]" 
                      : "border-transparent bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    <div className="w-full aspect-video rounded-lg border border-white/15 bg-black/20 flex items-center justify-center">
                      <span className="text-white/25 font-bold text-xs uppercase tracking-[0.3em] select-none pointer-events-none">
                        Sin imagen
                      </span>
                    </div>
                    
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
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SelectorTablero;