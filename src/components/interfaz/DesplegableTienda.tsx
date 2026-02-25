"use client"
import { useState } from "react";
import React from 'react'
interface DesplegableTiendaProps {
    nombreSeccion: string;
    estaAbierto: boolean;
    children: React.ReactNode;
}

const DesplegableTienda = (props: DesplegableTiendaProps) => {
  const [abierto, setAbierto] = useState(props.estaAbierto);
  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg border-amber-500 border-2">
        <div className="flex items-center justify-between cursor-pointer" onClick={() => setAbierto(!abierto)}>
            <h1 className="text-xl">{props.nombreSeccion}</h1>
            <button className="cursor-pointer">
              <h1 className="text-sm">{abierto ? "^" : ">"}</h1>
            </button>
        </div>
        <div className={abierto ? "block" : "hidden"}>
            <div className="flex items-center gap-10 pt-5">
              {props.children}
            </div>
        </div>
    </div>
  )
}

export default DesplegableTienda