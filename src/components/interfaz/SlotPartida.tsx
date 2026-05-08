import React from 'react'
import CajaLista from './CajaLista';
import Link from 'next/dist/client/link';
interface SlotPartidaProps {
    jugadores: string[];
    fecha: string;
    mapa: string;
    ID: string;
}

export const SlotPartida = (props: SlotPartidaProps) => {
  return (
    <CajaLista>
      <div className="flex flex-col font-sans gap-4 w-full">
        <div className="flex text-2xl gap-25 justify-between items-center w-full">
          <h1 className="flex-1">Partida en {props.mapa}</h1>
          <h1 className="flex-1 text-center">{props.fecha.substring(0, 10)}</h1>
          <Link href={`/partida?matchId=${props.ID}`} className="text-white underline pt-4 flex-1 text-right">Continuar</Link>
        </div>
        <ul className="flex list-inside text-gray-300">
          {props.jugadores.map((jugador, index) => (
            <li key={index}>
              {jugador}
              {index < props.jugadores.length - 1 ? ', ' : ''}
            </li>
          ))}
        </ul>
      </div>
    </CajaLista>
  )
}

export default SlotPartida;