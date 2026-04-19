// src/app/juego/mazos/page.tsx
'use client';
import React, { useState } from 'react';
import Link from "next/link";
import { SlotMazo } from "@/components/interfaz/SlotMazo";
import { useMazos } from "@/hooks/useMazos";
import { BorrarMazoConfirmar } from "@/components/interfaz/BorrarMazoConfirmar";

export default function MisMazosPage() {
  const emailDelUsuario = "admin@juego.com"; 
  const { decks, isLoading, handleDelete, handleSelect } = useMazos(emailDelUsuario);

  // ESTADO PARA EL MAZO SELECCIONADO PARA BORRAR
  const [mazoABorrar, setMazoABorrar] = useState<{id: string, nombre: string} | null>(null);

  const ejecutarBorrado = () => {
    if (mazoABorrar) {
      handleDelete(mazoABorrar.id);
      setMazoABorrar(null); // Cerramos el modal limpiando el estado
    }
  };

  if (isLoading) return <div className="text-white text-center mt-10 text-2xl w-full ">Cargando Mazos...</div>;

  return (
    <main className="w-full h-full flex flex-col p-4 md:p-8 overflow-y-auto custom-scroll relative">  
      
      {/* MODAL ESPECÍFICO */}
      <BorrarMazoConfirmar 
        isOpen={!!mazoABorrar} // Si hay algo en mazoABorrar, el modal se abre
        nombreMazo={mazoABorrar?.nombre || ""}
        onConfirm={ejecutarBorrado}
        onCancel={() => setMazoABorrar(null)}
      />

      <div className="flex items-center justify-center text-white text-3xl font-bold shrink-0 mb-8 ">
        <h1>Mis mazos ({decks.length}/8)</h1>       
      </div>

      <div className="flex justify-start w-full shrink-0 mb-6 ">
        {/* ... Botón "Nuevo Mazo" igual que antes ... */}
        {decks.length < 8 && (
          <Link href="/juego/mazos/editarmazos" className="flex rounded-lg bg-[#283F9F] border-amber-400 border-2 font-sans font-bold w-60 h-14 items-center justify-center text-white hover:bg-[#1a237e]/80 gap-3 shadow-md transition-colors group">  
            <div className="border-2 border-white/70 rounded-full w-6 h-6 flex items-center justify-center text-xl font-normal leading-none pb-[2px]">+</div>
            <span className="group-hover:underline uppercase text-sm">Nuevo Mazo</span>
          </Link>
        )}
      </div>

      <ul className="flex flex-col gap-4">
        {decks.map((mazo) => (
          <SlotMazo 
            key={mazo.id}
            id={mazo.id}
            nombreMazo={mazo.deck_name} 
            previewCartas={mazo.cards} 
            mazoEnUso={mazo.is_in_use}
            // MODIFICACIÓN: Pasamos una función que capture ID y Nombre
            onDelete={(id) => setMazoABorrar({ id, nombre: mazo.deck_name })} 
            onSelect={handleSelect}
          />
        ))}
      </ul>
    </main>
  );
}