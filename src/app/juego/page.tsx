'use client'; 

import Link from "next/link";
import { useRouter } from "next/navigation"; 
import React, { useEffect, useState } from "react";
import HuecoJugador from "@/components/interfaz/HuecoJugador";
import SelectorMazo from "@/components/interfaz/SelectorMazo";
import SelectorTablero from "@/components/interfaz/SelectorTablero";
// import { useLobby } from "@/hooks/useLobby";

export default function JuegoPrincipalPage() {
  const router = useRouter(); // Inicializamos el router

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
  // Mazo seleccionado
  const [mazoElegido, setMazoElegido] = useState("Mazo de Fuego");
  // Tablero seleccionado
  const [tableroElegido, setTableroElegido] = useState("Tablero Clásico");

  return (
    <main className="w-full h-full flex flex-col p-4 md:p-8 relative">
      
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
          
          <SelectorMazo 
          mazoSeleccionado={mazoElegido} 
          onMazoSeleccionado={(mazo) => setMazoElegido(mazo)} 
          />

          {/* SELECTOR DE TABLERO (Modal) */}
          <SelectorTablero 
            tableroSeleccionado={tableroElegido}
            onTableroSeleccionado={(t) => setTableroElegido(t)}
          />

          {/* BOTÓN COMENZAR PARTIDA */}
            <button 
              className="w-full bg-[#2078B4] hover:bg-[#00aeb5] text-white font-bold py-3 px-4 rounded-lg border-[#EFB810] border-white shadow-lg text-lg mt-2 transition-colors"
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