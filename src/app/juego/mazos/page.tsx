// src/app/juego/mazos/page.tsx
'use client';
import Link from "next/link";
import { SlotMazo } from "@/components/interfaz/SlotMazo";
import { useDecks } from "@/hooks/useMazos"; // Tu nuevo hook

export default function MisMazosPage() {
  // Aquí asumo que sacas el email del contexto/Zustand. 
  // Lo pongo a mano para el ejemplo.
  const emailDelUsuario = "admin@juego.com"; 

  // Extraemos los datos y la función de borrado de nuestro hook
  const { decks, isLoading, error, handleDeleteDeck } = useDecks(emailDelUsuario);

  if (isLoading) return <div className="text-white text-center mt-10 text-2xl">Cargando tus mazos...</div>;
  if (error) return <div className="text-red-500 text-center mt-10">Error: {error}</div>;

  return (
    <main className="p-10">  
      <div className="flex flex-col text-2xl">
        <h1 className='text-white text-3xl text-center'>Mis mazos ({decks.length}/8)</h1>       
        
        {decks.length < 8 && (
          <div className="mt-4 flex rounded-lg bg-gray-700 font-sans font-bold w-60 h-15 items-center justify-center text-white hover:bg-gray-600 gap-4">  
            <div className="border-2 border-white/70 rounded-full w-6 h-6 flex items-center justify-center text-2xl font-normal pb-1">+</div>
            <Link href="/juego/mazos/editarmazos" className="hover:underline">
              Nuevo Mazo
            </Link>
          </div>
        )}
      </div>

      <ul className="mt-4 flex flex-col gap-4">
        {decks.length === 0 ? (
          <p className="text-gray-400 mt-4 text-center">Aún no tienes ningún mazo. ¡Crea uno!</p>
        ) : (
          decks.map((deck) => {
            // Adaptamos las cartas para el preview (si tu API devuelve objetos, extraemos el nombre)
            // Si tu API ya devuelve un array de strings, puedes pasar deck.cards directamente.
            const nombresDeCartas = deck.cards.map((carta: any) => 
              typeof carta === 'string' ? carta : carta.nombre
            );

            return (
              <SlotMazo 
                key={deck.id}
                id={deck.id}
                // Aquí usamos los nombres correctos de la API (deck_name en vez de name)
                nombreMazo={deck.deck_name} 
                previewCartas={nombresDeCartas} 
                mazoEnUso={deck.is_in_use || false}
                onDelete={handleDeleteDeck} // Le pasamos la función del hook
              />
            );
          })
        )}
      </ul>
    </main>
  );
}