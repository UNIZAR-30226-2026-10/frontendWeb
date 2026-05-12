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
  let displayDate = props.fecha;
  if (props.fecha.includes('T')) {
    const parts = props.fecha.substring(0, 10).split('-');
    displayDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
  } else if (props.fecha === "Partida en curso") {
    displayDate = "en curso";
  }

  return (
    <CajaLista>
      <div className="flex justify-between items-center w-full font-sans">
        <div className="flex flex-col">
          <span className="text-white font-semibold text-lg mb-1">Partida del {displayDate} | {props.mapa}</span>
          <span className="text-gray-300 text-sm">Participantes: {props.jugadores.join(', ')}</span>
        </div>
        <div>
          <Link href={`/partida?matchId=${props.ID}`} className="text-white text-base font-bold hover:text-gray-200 underline underline-offset-2">
            Continuar
          </Link>
        </div>
      </div>
    </CajaLista>
  )
}

export default SlotPartida;