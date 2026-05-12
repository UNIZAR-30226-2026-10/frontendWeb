'use client';

import React, { useState } from 'react';
import Link from "next/link";
import { SlotMazo } from "@/components/interfaz/SlotMazo";
import { useMazos } from "@/hooks/useMazos";
import { BorrarMazoConfirmar } from "@/components/interfaz/BorrarMazoConfirmar";
import { useUser } from "@/context/userContext";

export default function MisMazosPage() {
  const { userEmail } = useUser();
  const { decks, isLoading, handleDelete } = useMazos(userEmail || "");

  const [mazoABorrar, setMazoABorrar] = useState<{id: string, nombre: string} | null>(null);

  if (!userEmail) return null;

  const ejecutarBorrado = async () => {
    if (mazoABorrar) {
      await handleDelete(mazoABorrar.id);
      setMazoABorrar(null);
    }
  };

  if (isLoading) {
    return (
      <main className="w-full h-full flex items-center justify-center">
        <div className="text-white text-2xl font-bold animate-pulse">Cargando tus mazos...</div>
      </main>
    );
  }

  return (
    <main className="w-full h-full flex flex-col p-4 md:p-8 overflow-y-auto custom-scroll relative">  
      
      <BorrarMazoConfirmar 
        isOpen={!!mazoABorrar} 
        nombreMazo={mazoABorrar?.nombre || ""}
        onConfirm={ejecutarBorrado}
        onCancel={() => setMazoABorrar(null)}
      />

      <div className="flex items-center justify-center text-white text-3xl font-bold shrink-0 mb-8 ">
        <h1>Mis mazos ({decks.length}/8)</h1>       
      </div>

      <div className="flex justify-start w-full shrink-0 mb-6 ">
        {decks.length < 8 && (
          <Link 
            href="/juego/mazos/editarmazos" 
            className="flex rounded-lg bg-[#283F9F] border-amber-400 border-2 font-sans font-bold w-60 h-14 items-center justify-center text-white hover:bg-[#1a237e] gap-3 shadow-md transition-all group"
          >  
            <div className="border-2 border-white/70 rounded-full w-7 h-7 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="w-4 h-4 text-white">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </div>
            <span className="group-hover:underline uppercase text-sm">Nuevo Mazo</span>
          </Link>
        )}
      </div>

      {decks.length === 0 ? (
        <div className="flex flex-col items-center mt-10 text-gray-400">
          <p className="text-xl">No tienes ningún mazo creado todavía.</p>
        </div>
      ) : (
        <ul className="flex flex-col gap-6"> {/* Aumentado el gap para que quepa la info extra */}
          {decks.map((mazo) => (
            <li key={mazo.id} className="flex flex-col gap-2 bg-white/5 p-4 rounded-xl border border-white/10">
              <SlotMazo 
                id={mazo.id}
                nombreMazo={mazo.nombre} 
                previewCartas={mazo.cartas} 
                mazoEnUso={false}
                onDelete={(id) => setMazoABorrar({ id, nombre: mazo.nombre })} 
                onEdit={(id) => window.location.href = `/juego/mazos/editarmazos?id=${id}`}
              />
              
              {/* --- INFO EXTRA DE DEPURACIÓN --- */}
              <div className="px-4 py-2 bg-black/30 rounded-lg">
                <p className="text-xs text-yellow-500 font-bold uppercase mb-1">Contenido del mazo ({mazo.cartas.length} cartas):</p>
                <p className="text-sm text-gray-300 italic">
                  {mazo.cartas.length > 0 
                    ? mazo.cartas.map(c => c.nombre).join(", ") 
                    : "Este mazo está vacío (error al guardar cartas)"}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}