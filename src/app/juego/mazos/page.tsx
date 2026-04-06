// src/app/juego/mazos/page.tsx
'use client';
import Link from "next/link";
import { SlotMazo } from "@/components/interfaz/SlotMazo";
import { useDecks } from "@/hooks/useMazos"; 

export default function MisMazosPage() {
  const emailDelUsuario = "admin@juego.com"; 

  const { decks, isLoading, error, handleDeleteDeck } = useDecks(emailDelUsuario);

  if (isLoading) return <div className="text-white text-center mt-10 text-2xl w-full">Cargando tus mazos...</div>;
  if (error) return <div className="text-red-500 text-center mt-10 w-full">Error: {error}</div>;

  return (
    <main className="w-full h-full flex flex-col p-4 md:p-8 overflow-y-auto custom-scroll">  
      <div className="flex items-center justify-center text-white text-3xl font-bold shrink-0 mb-6">
        <h1 className="text-center">Mis mazos ({decks.length}/8)</h1>       
      </div>

      <div className="flex justify-start w-full shrink-0 mb-6 ">
        {decks.length < 8 && (
          <Link 
            href="/juego/mazos/editarmazos" 
            className="flex rounded-lg bg-[#1a237e] border-amber-400 border-2 font-sans font-bold w-60 h-14 items-center justify-center text-white hover:bg-[#1a237e]/80 gap-3 shadow-md transition-colors group"
          >  
            <div className="border-2 border-white/70 rounded-full w-6 h-6 flex items-center justify-center text-xl font-normal leading-none pb-[2px]">
              +
            </div>
            <span className="group-hover:underline">Nuevo Mazo</span>
          </Link>
        )}
      </div>

      <ul className="flex flex-col gap-4">
        {decks.length === 0 ? (
          <p className="text-gray-400 mt-4 text-center text-lg">Aún no tienes ningún mazo. ¡Crea uno!</p>
        ) : (
          decks.map((deck) => {
            const nombresDeCartas = deck.cards.map((carta: any) => 
              typeof carta === 'string' ? carta : carta.nombre
            );

            return (
              <SlotMazo 
                key={deck.id}
                id={deck.id}
                nombreMazo={deck.deck_name} 
                previewCartas={nombresDeCartas} 
                mazoEnUso={deck.is_in_use || false}
                onDelete={handleDeleteDeck} 
              />
            );
          })
        )}
      </ul>
    </main>
  );
}