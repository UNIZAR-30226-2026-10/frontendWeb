"use client"
import React from 'react'
import CajaLista from './CajaLista';
import Link from 'next/link';
{/*Habrá que cambiar esto para que use la clase mazo*/}
interface SlotMazoProps {
    nombreMazo: string;
    numMazos: number;
    previewCartas: string[]; //Mostramos como preview las primeras 3 cartas del mazo y las copias de cada una de ellas.
    mazoEnUso: boolean; //Indica si el mazo está siendo utilizado en una partida, para mostrar un mensaje de advertencia
}
export const SlotMazo = (props: SlotMazoProps) => {
  return (
    <CajaLista>
      <div className="flex flex-col font-sans gap-4">
          <div className="flex text-2xl justify-between">
              <h1 className="text-white text-3xl">{props.nombreMazo} {props.mazoEnUso ? "(En uso)" : ""}</h1>
              <div className="flex items-center gap-10 pt-6">
                <Link href="/mazos/editarmazos" className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-500">Editar</Link>
                <button
                  type="button"
                  onClick={() => console.log('Borrar mazo:', props.nombreMazo)} /*Llamada a la API para borrar el mazo*/
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500 on_hover:cursor-pointer"
                >
                  Borrar
                </button>
              </div>
        </div>
        <ul className="flex list-inside text-xl text-white">
          {props.previewCartas.map((carta, index) => (
            <li key={index}>{carta},</li>
          ))}
        </ul>
      </div>
    </CajaLista>
  )
}

export default SlotMazo;