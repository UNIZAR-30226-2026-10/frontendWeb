import Carta from "@/types/carta";
import React from 'react'
export const DisplayCarta = (props: { carta: Carta }) => {
  {/*hay que hacer que el borde de la carta cambie de color según la rareza de la carta*/}
  return (
    <div className="flex flex-col bg-gray-700 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-white">{props.carta.nombre}</h2>
      {/*poner la imagen de la carta*/}
      <p className="text-white">{props.carta.descripcion}</p>
    </div>
  )
}
