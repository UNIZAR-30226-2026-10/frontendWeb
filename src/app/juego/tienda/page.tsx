'use client';

import React, { useState } from 'react';
import DesplegableTienda from "@/components/interfaz/DesplegableTienda";
import SlotTienda from "@/components/interfaz/SlotTienda";
import ConfirmarCompra from "@/components/interfaz/ConfirmarCompra";
import ItemTienda from "@/types/itemTienda";
import { useTienda } from '@/hooks/useTienda';

export default function Tienda() {
  const emailUsuario = "admin@juego.com"; 
  const { tienda, isLoading, error } = useTienda(emailUsuario);
  const [itemSeleccionado, setItemSeleccionado] = useState<ItemTienda | null>(null);

  if (isLoading) {
    return <div className="text-white text-center mt-10 text-2xl w-full font-bold">Cargando tienda...</div>;
  }

  if (error || !tienda) {
    return <div className="text-red-500 text-center mt-10 w-full font-bold">Error: {error || 'No se pudo cargar'}</div>;
  }

  return (
    <main className="w-full h-full flex flex-col p-4 md:p-8 overflow-y-auto relative custom-scroll">
      
      {/* Modal de confirmación */}
      <ConfirmarCompra 
        item={itemSeleccionado} 
        onClose={() => setItemSeleccionado(null)} 
        onConfirm={(item) => {
          console.log("Comprado:", item.nombre);
          setItemSeleccionado(null);
        }}
      />

      {/* Cabecera idéntica a Logros */}
      <div className="flex items-center justify-center text-white text-3xl font-bold shrink-0 mb-8 relative"> 
        <h1>Tienda </h1>
        
        {/* Monedero estilizado */}
        <div className="absolute right-0 px-4 py-2 bg-[#283F9F] border-amber-400 border-2 rounded-xl flex items-center gap-2 text-lg shadow-md">
          <span className="text-amber-400">SEP</span>
          <span>{tienda.sepDisponible}</span>
        </div>
      </div>

      {/* Listado de secciones */}
      <div className="flex flex-col gap-4">
        {tienda.secciones.map((seccion) => (
          <DesplegableTienda key={seccion.nombre} nombreSeccion={seccion.nombre}>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {seccion.items.map((item, idx) => (
                <SlotTienda 
                  key={`${item.nombre}-${idx}`} 
                  item={item} 
                  onSelect={setItemSeleccionado} 
                />
              ))}
            </div>
          </DesplegableTienda>
        ))}
      </div>
    </main>
  );
}