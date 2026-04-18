"use client";
import React from 'react';
import Carta from '@/types/carta';

interface ModalCartaProps {
  carta: Carta | null;
  onClose: () => void;
  onJugar: (carta: Carta) => void;
  esMiTurno: boolean;
  yaJugadoCarta: boolean; // <--- Nueva prop
}

export const ModalCarta: React.FC<ModalCartaProps> = ({ 
  carta, 
  onClose, 
  onJugar, 
  esMiTurno, 
  yaJugadoCarta 
}) => {
  if (!carta) return null;

  // El botón solo se habilita si es mi turno Y no he jugado carta todavía
  const puedeJugar = esMiTurno && !yaJugadoCarta;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative bg-slate-900 border-2 border-blue-500 p-5 rounded-3xl shadow-[0_0_50px_rgba(37,99,235,0.5)] max-w-[340px] w-full flex flex-col items-center gap-4 animate-in zoom-in-95 duration-200 z-10 max-h-[95vh]">
        
        <button onClick={onClose} className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors text-xl z-20">✕</button>

        <h2 className="shrink-0 text-xl font-black text-white uppercase tracking-widest border-b-2 border-blue-500 pb-1 w-full text-center mt-2">
          {carta.nombre}
        </h2>

        <div className="w-full flex-1 flex items-center justify-center min-h-0 overflow-hidden">
          <img src={carta.img} className="max-w-full max-h-[45vh] object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]" alt={carta.nombre} />
        </div>

        <div className="shrink-0 bg-blue-950/60 p-3 rounded-xl border border-blue-800/50 w-full">
          <p className="text-blue-100 text-center text-sm italic leading-tight">&quot;{carta.efecto}&quot;</p>
        </div>

        <div className="shrink-0 w-full">
          {puedeJugar ? (
            <button 
              onClick={() => onJugar(carta)}
              className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-500 hover:to-emerald-400 text-white font-black rounded-2xl shadow-xl transition-all transform active:scale-95 uppercase tracking-wider text-sm"
            >
              Utilizar Carta
            </button>
          ) : (
            <div className="py-2 px-6 bg-red-500/10 border border-red-500/50 rounded-full text-center">
              <p className="text-red-400 font-bold text-xs uppercase italic tracking-wide">
                {/* LÓGICA DEL MENSAJE DINÁMICO */}
                {!esMiTurno ? "No es tu turno" : "Ya has usado una carta este turno"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};