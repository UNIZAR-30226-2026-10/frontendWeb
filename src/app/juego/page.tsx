'use client'; 

import Link from "next/link";
import { useRouter } from "next/navigation"; 
import React, { useState } from "react";
import HuecoJugador from "@/components/interfaz/HuecoJugador";
import PopupSalirLobby from "@/components/interfaz/PopupSalirLobby"; 

export default function JuegoPrincipalPage() {
  const router = useRouter(); 
  const [mostrarPopupSalir, setMostrarPopupSalir] = useState(false);

  const error = null;
  const huecos = [
    { idJugador: "yo", nombre: "Tú" },
    undefined, 
    undefined, 
    undefined
  ];
  const miLobbyCreadorId = "yo"; 

  const manejarSalida = () => {
    // Aqui se implementa la conexion con la API para abandonar el lobby.
    setMostrarPopupSalir(false);
    router.push('/juego'); 
  };

  return (
    <main className="w-full h-full flex flex-col p-4 md:p-8 overflow-y-auto bg-[#295ce5] relative">
      
      <PopupSalirLobby 
        isOpen={mostrarPopupSalir} 
        onClose={() => setMostrarPopupSalir(false)} 
        onConfirm={manejarSalida} 
      />

      <div className="relative flex justify-center items-center text-3xl mb-2 shrink-0 text-white h-12">
        
        <button 
          onClick={() => setMostrarPopupSalir(true)}
          className="absolute left-0 text-gray-200 hover:text-white hover:scale-110 transition-all cursor-pointer"
          title="Abandonar Lobby"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="red" className="w-9 h-9">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
          </svg>
        </button>

        <div className="flex gap-12">
          <h1 className="flex underline font-bold cursor-pointer">Crear Partida</h1>
          <Link href="/juego/continuarpartida" className="text-center font-bold hover:text-gray-300">
            Continuar
          </Link>
        </div>
      </div>

      {/* ZONA DE JUGADORES */}
      <div className="flex items-center justify-center flex-1 gap-4 md:gap-12 w-full max-w-6xl mx-auto min-h-0 mt-4">
        
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
        <div className="flex flex-col items-center justify-center gap-4 min-w-[200px] w-full max-w-[250px] shrink-0 text-white h-full overflow-y-auto py-2 overflow-y-hidden">
          
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