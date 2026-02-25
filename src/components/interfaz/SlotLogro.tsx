"use client"
import React from 'react'
import CajaLista from './CajaLista';
interface SlotLogroProps {
    nombreLogro: string;
    descripciónLogro: string;
    progresoLogro: number; //Valor del progreso que el usuario ha alcanzado en el logro
    metaLogro: number; //Valor que indica la meta a alcanzar para completar el logro
    recompensaLogro: string; //Recompensa que el usuario recibirá al completar el logro, puede ser cartas, skins o monedas
}
export const SlotLogro = (props: SlotLogroProps) => {
  return (
    <CajaLista>
        <div className='flex text-white justify-between items-center'>
            <div className='flex flex-col gap-4'>
                <h2 className='text-2xl font-bold'>{props.nombreLogro}</h2>
                <p>{props.descripciónLogro}</p>
                <p>Progreso: {props.progresoLogro}/{props.metaLogro}</p>
            </div>
            <div className='flex flex-col items-center justify-end'>
                <p>Recompensa</p>
                <p>{props.recompensaLogro}</p>
            </div>
        </div>
    </CajaLista>
  )
}

export default SlotLogro;