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
                    className={`aspect-[2/3] rounded-md border-2 ${getBorderClass(rareza)} bg-black shadow-md p-1 flex flex-col items-center`}
                  >
                    <div className="w-full text-[10px] font-bold leading-tight text-white text-center truncate px-1">
                      {carta.nombre}
                    </div>

                    <div className="mt-1 w-[82%] h-[65%] rounded-sm border border-white/20 bg-gray-900 overflow-hidden flex items-center justify-center">
                      <img
                        src={carta.imagen}
                        alt={carta.nombre}
                        className="h-full w-full object-contain -translate-y-1"
                        loading="lazy"
                      />
                    </div>
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