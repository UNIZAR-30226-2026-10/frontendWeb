'use client'; 

import Link from "next/link";
import { useRouter } from "next/navigation"; 
import React, { useEffect, useState } from "react";
import HuecoJugador from "@/components/interfaz/HuecoJugador";
// import { useLobby } from "@/hooks/useLobby";

export default function JuegoPrincipalPage() {
  const router = useRouter(); // 2. Inicializamos el router

  /*
  const { lobby, isLoading, error, cargarLobby, crearLobby, añadirBot } = useLobby();
  const [miEmail, setMiEmail] = useState<string>("");
  const [miNombre, setMiNombre] = useState<string>("");
  useEffect(() => { ... }, []);
  */

  // --- LÓGICA MOCKEADA PARA LA DEMO ---
  const error = null;
  // Forzamos que el hueco 0 tenga un jugador líder, y el resto undefined
  const huecos = [
    { idJugador: "yo", nombre: "Tú" },
    undefined, 
    undefined, 
    undefined
  ];
  const miLobbyCreadorId = "yo"; 

  return (
    <main className="w-full h-full flex flex-col p-4 md:p-8 overflow-y-auto bg-[#295ce5]">
      
      {/* CABECERA */}
      <div className="flex justify-center items-center gap-12 text-3xl mb-2 shrink-0 text-white">
        <h1 className="flex underline font-bold cursor-pointer">Crear Partida</h1>
        <Link href="/juego/continuarpartida" className="text-center font-bold hover:text-gray-300">
          Continuar
        </Link>
      </div>

      {/* ZONA DE JUGADORES */}
      <div className="flex items-center justify-center flex-1 gap-4 md:gap-12 w-full max-w-6xl mx-auto min-h-0">
        
        {/* COLUMNA IZQUIERDA */}
        <div className="flex flex-col justify-center gap-4 h-full w-full max-w-[300px] min-h-0">
          <div className="flex-1 min-h-0 flex flex-col justify-center">
            <HuecoJugador 
              estaOcupado={!!huecos[0]} 
              esLider={huecos[0]?.idJugador === miLobbyCreadorId} 
              nomJugador={huecos[0]?.nombre} 
            />
          </div>
          <div className="flex-1 min-h-0 flex flex-col justify-center">
            <HuecoJugador 
              estaOcupado={!!huecos[1]} 
              esLider={huecos[1]?.idJugador === miLobbyCreadorId} 
              nomJugador={huecos[1]?.nombre} 
            />
          </div>
        </div>

        {/* COLUMNA CENTRAL */}
        <div className="flex flex-col items-center justify-center gap-4 min-w-[200px] w-full max-w-[250px] shrink-0 text-white h-full overflow-y-auto py-2">
          
          {/* CARTA MAZO */}
          <div className="bg-[#263c85] border-[#EFB810] border-white rounded-xl px-4 py-3 w-full flex justify-between items-center shadow-lg cursor-pointer">
            <div className="flex flex-col">
              <p className="font-bold text-2xl leading-none">Mazo</p>
              <p className="text-xs text-gray-300 mt-1">Lategame</p>
            </div>
            <div className="text-3xl text-white font-bold pb-1">
              ➔
            </div>
          </div>

          {/* CARTA TABLERO */}
          <div className="bg-[#263c85] border-[2px] border-[#EFB810] rounded-xl p-3 w-full aspect-square max-h-[220px] flex flex-col items-center shadow-lg relative cursor-pointer">
            <p className="font-bold text-xl mb-2">Tablero</p>
            {/* El amarillo pálido del lienzo del tablero */}
            <div className="w-full flex-1 bg-[#fef18b] rounded-sm flex items-center justify-center text-4xl shadow-inner relative overflow-hidden">
               <div className="absolute text-5xl">✏️</div>
            </div>
          </div>

          {/* BOTÓN COMENZAR PARTIDA */}
            <button 
              className="w-full bg-[#00c5cd] hover:bg-[#00aeb5] text-black font-extrabold py-3 px-4 rounded-lg border-[#EFB810] border-white shadow-lg text-lg mt-2 transition-colors"
              onClick={() => router.push('/partida')}
            >
              Comenzar Partida
            </button>
        </div>       

        {/* COLUMNA DERECHA */}
        <div className="flex flex-col justify-center gap-4 h-full w-full max-w-[300px] min-h-0">
          <div className="flex-1 min-h-0 flex flex-col justify-center">
            <HuecoJugador 
              estaOcupado={!!huecos[2]} 
              esLider={huecos[2]?.idJugador === miLobbyCreadorId} 
              nomJugador={huecos[2]?.nombre} 
            />
          </div>
          <div className="flex-1 min-h-0 flex flex-col justify-center">
            <HuecoJugador 
              estaOcupado={!!huecos[3]} 
              esLider={huecos[3]?.idJugador === miLobbyCreadorId} 
              nomJugador={huecos[3]?.nombre} 
            />
          </div>
        </div>

      </div>
    </main>
  );
}