// src/components/interfaz/SlotMazo.tsx
"use client"
import React from 'react'
import CajaLista from './CajaLista';
import Link from 'next/link';

// 1. AQUÍ ESTÁ LA MAGIA: Actualizamos los Props para que TypeScript no se queje
interface SlotMazoProps {
  id: string; 
  nombreMazo: string;
  numMazos?: number; // Le pongo el "?" por si a veces no lo pasas, que no dé error
  previewCartas: string[];
  mazoEnUso: boolean;
  onDelete: (id: string) => void;
}

export const SlotMazo = (props: SlotMazoProps) => {
  return (
    <CajaLista>
      <div className="flex flex-col font-sans gap-4">
        <div className="flex text-2xl justify-between">
            <h1 className="text-white text-3xl">{props.nombreMazo} {props.mazoEnUso ? "(En uso)" : ""}</h1>
            <div className="flex items-center gap-10 pt-6">
              <Link href="/juego/mazos/editarmazos" className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-500">
                Editar
              </Link>
              
              {/* 2. AQUÍ ACTUALIZAMOS EL BOTÓN para usar la función real */}
              <button
                type="button"
                onClick={() => props.onDelete(props.id)}
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
        
        <ul className="flex list-inside text-xl text-white">
          {props.previewCartas.map((carta, index) => (
            <li key={index} className="mr-2">{carta},</li>
          ))}
        </ul>
      </div>
    </CajaLista>
  )
}

export default SlotMazo;