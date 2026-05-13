/* eslint-disable @next/next/no-img-element */
"use client"
import React, { useState } from 'react'
import CajaLista from './CajaLista';
import Carta from '@/types/carta'; 

interface SlotMazoProps {
  id: string; 
  nombreMazo: string;
  numMazos?: number; 
  previewCartas: Carta[]; 
  mazoEnUso: boolean;
  onDelete: (id: string) => void;
  onSelect?: (id: string) => void;
  onEdit: (id: string) => void;
}

export const SlotMazo = (props: SlotMazoProps) => {
  const [mostrarCartas, setMostrarCartas] = useState(false);

  const getBorderClass = (valorRareza: string) => {
    switch (valorRareza.toLowerCase()) {
      case 'comun': return 'border-green-500';
      case 'rara': return 'border-orange-500';
      case 'epica': return 'border-purple-500';
      case 'legendaria': return 'border-yellow-600';
      default: return 'border-gray-500';
    }
  };

  const cartasMini = Array.from({ length: 10 }, (_, index) => props.previewCartas[index] ?? null);

  return (
    <CajaLista>
      <div
        className="flex flex-col font-sans gap-4 cursor-pointer select-none"
        onClick={() => setMostrarCartas((valor) => !valor)}
      >
        <div className="flex text-2xl justify-between">
            <h1 className="text-white text-3xl font-bold">{props.nombreMazo} {props.mazoEnUso ? "(En uso)" : ""}</h1>
            <div className="flex items-center gap-4 pt-6">
              <button 
                onClick={(event) => {
                  event.stopPropagation();
                  props.onEdit(props.id);
                }} 
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-500 transition-colors"
              >
                Editar
              </button>
              
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  props.onDelete(props.id);
                }}
                disabled={props.mazoEnUso}
                className={`px-3 py-1 rounded text-white
                  ${props.mazoEnUso 
                    ? 'bg-gray-500 cursor-not-allowed' 
                    : 'bg-red-600 hover:bg-red-500 cursor-pointer'}`}
              >
                Borrar
              </button>
            </div>
        </div>

        {mostrarCartas && (
          <div className="pt-2 border-t border-white/10">
            <div className="grid grid-cols-5 gap-2 w-full">
              {cartasMini.map((carta, index) => {
                if (!carta) {
                  return (
                    <div
                      key={`empty-${index}`}
                      className="aspect-[2/3] rounded-md border-2 border-dashed border-white/20 bg-black/20"
                    />
                  );
                }

                const rareza = carta.calidad || (carta as Carta & { rareza?: string }).rareza || '';

                return (
                  <div
                    key={`${props.id}-${index}`}
                    className={`flex flex-col bg-black p-2 rounded-lg shadow-md border-[3px] ${getBorderClass(rareza)} transition-all duration-300 h-full w-full`}
                  >
                    <h2 className="text-[11px] sm:text-xs font-bold text-white mb-2 text-center truncate">{carta.nombre}</h2>
                    
                    <div className="self-center w-[95%] sm:w-full border border-white/10 rounded bg-gray-900 overflow-hidden flex items-center justify-center">
                      <img
                        src={carta.imagen}
                        alt={carta.nombre}
                        className="w-full h-auto block object-contain"
                        loading="lazy"
                      />
                    </div>
                    
                    <p className="text-white mt-2 text-[9px] sm:text-[10px] overflow-hidden italic text-center line-clamp-3 flex-1 flex items-start justify-center">
                      &quot;{carta.descripcion}&quot;
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </CajaLista>
  )
}

export default SlotMazo;