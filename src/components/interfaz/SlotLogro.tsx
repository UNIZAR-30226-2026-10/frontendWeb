"use client"
import React from 'react'
import CajaLista from './CajaLista';
interface SlotLogroProps {
    nombreLogro: string;
    descripciónLogro: string;
    progresoLogro: number; //Valor del progreso que el usuario ha alcanzado en el logro
    metaLogro: number; //Valor que indica la meta a alcanzar para completar el logro
    recompensaLogro: string; //Recompensa que el usuario recibirá al completar el logro, puede ser cartas, skins o monedas
    completado?: boolean;
    onReclamar?: () => void;
}
export const SlotLogro = (props: SlotLogroProps) => {
  const puedeReclamar = props.progresoLogro >= props.metaLogro && !props.completado;

  return (
    <CajaLista>
        <div className='flex text-white justify-between items-center font-bold'>
            <div className='flex flex-col gap-4'>
                <h2 className='text-2xl font-bold'>{props.nombreLogro}</h2>
                <p>{props.descripciónLogro}</p>
                <p>Progreso: {props.progresoLogro}/{props.metaLogro}</p>
            </div>
            <div className='flex flex-col items-center justify-end gap-2'>
                {props.completado ? (
                    <span className="text-green-400 text-lg uppercase tracking-wider">¡Completado!</span>
                ) : puedeReclamar ? (
                    <button 
                      onClick={props.onReclamar}
                      className="bg-green-500 hover:bg-green-400 text-black font-bold py-2 px-6 rounded-lg uppercase transition-all shadow-[0_0_10px_rgba(34,197,94,0.6)] animate-pulse"
                    >
                        Reclamar
                    </button>
                ) : (
                  <>
                    <p>Recompensa</p>
                    <p>{props.recompensaLogro}</p>
                  </>
                )}
            </div>
        </div>
    </CajaLista>
  )
}

export default SlotLogro;