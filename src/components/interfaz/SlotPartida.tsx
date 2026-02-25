import React from 'react'
import CajaLista from './CajaLista';
import Link from 'next/dist/client/link';
interface SlotPartidaProps {
    jugadores: string[];
    fechaCreacion: string;
    turnoActual: string;
    creadorPartida: string;
}

export const SlotPartida = (props: SlotPartidaProps) => {
  return (
    <CajaLista>
      <div className="flex flex-col font-sans gap-4">
        <div className="flex text-2xl gap-70">
          <h1>Partida de {props.creadorPartida}</h1>
          <h1>{props.fechaCreacion}</h1>
          <h1>Turno {props.turnoActual}</h1>
          <Link href="/juego" className="text-white underline pt-4">Continuar</Link>
        </div>
        <ul className="flex list-inside">
          {props.jugadores.map((jugador, index) => (
            <li key={index}>{jugador},</li>
          ))}
        </ul>
      </div>
    </CajaLista>
  )
}

export default SlotPartida;