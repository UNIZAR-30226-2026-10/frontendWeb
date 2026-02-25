{/*Configuración para los cuadrados que van a utilizar las listas de partidas empezadas
    y mazos creados para editar, que se importan en los componentes específicos*/}

import React from 'react'

export const CajaLista = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-gray-700 border-amber-400 border-2 rounded-lg shadow-md p-4 mb-4">
         {/* Aquí va el contenido específico de cada lista, como partidas o mazos */}
         {children}
    </div>
  )
}

export default CajaLista;
