import ItemTienda from "@/types/itemTienda";

import React from 'react'

const SlotTienda = (props: { item: ItemTienda }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md border-2 border-yellow-500">
      <h2 className="text-xl font-bold text-white">{props.item.nombre}</h2>
        {/*poner la imagen del item*/}
      <h2 className="text-white text-center">Imagen</h2>
      <p className="text-white text-center"> SEP {props.item.precio}</p>
    </div>
  )
}

export default SlotTienda