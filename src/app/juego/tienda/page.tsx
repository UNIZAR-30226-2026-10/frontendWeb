'use client';

import DesplegableTienda from "@/components/interfaz/DesplegableTienda";
import SlotTienda from "@/components/interfaz/SlotTienda";
import React from 'react'
import { useTienda } from '@/hooks/useTienda';

export default function Tienda() {
  const emailUsuario = "admin@juego.com"; 
  const { tienda, isLoading, error } = useTienda(emailUsuario);

  if (isLoading) {
    return (
      <main className="w-full h-full flex flex-col p-4 md:p-8 overflow-y-auto items-center justify-center">
        <p className="text-white text-xl">Cargando tienda...</p>
      </main>
    );
  }

  if (error || !tienda) {
    return (
      <main className="w-full h-full flex flex-col p-4 md:p-8 overflow-y-auto items-center justify-center">
        <p className="text-red-500 text-xl">Error: {error || 'No se pudo cargar la tienda'}</p>
      </main>
    );
  }

  return (
    <main className="w-full h-full flex flex-col p-4 md:p-8 overflow-y-auto custom-scroll">  
      <div className="relative flex items-center justify-center text-white text-3xl mb-8 shrink-0">  
        <h1 className="text-center font-bold"> 
          Tienda
        </h1>
        <div className="absolute right-0 w-40 h-16 bg-[#283F9F] border-amber-400 border-2 rounded-2xl flex items-center justify-center text-xl shadow-md">
          <span>Sep {tienda.sepDisponible}</span>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {tienda.secciones.map((seccion) => (
          <DesplegableTienda key={seccion.nombre} nombreSeccion={seccion.nombre} estaAbierto={false}>
            {seccion.items.map((item) => (
              <SlotTienda key={item.nombre} item={item} />
            ))}
          </DesplegableTienda>
        ))}
      </div>
    </main>
  );
}