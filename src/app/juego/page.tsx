'use client'; 

import Link from "next/link";
import React, { useEffect, useState } from "react";
import HuecoJugador from "@/components/interfaz/HuecoJugador";
import { useLobby } from "@/hooks/useLobby";

export default function JuegoPrincipalPage() {
  const { lobby, isLoading, error, cargarLobby, crearLobby, añadirBot } = useLobby();
  
  const [miEmail, setMiEmail] = useState<string>("");
  const [miNombre, setMiNombre] = useState<string>("");

  useEffect(() => {
    const emailGuardado = localStorage.getItem("usuario_email") || "anonimo@mail.com";
    const nombreGuardado = localStorage.getItem("usuario_nombre") || "Jugador";
    
    setMiEmail(emailGuardado);
    setMiNombre(nombreGuardado);

    const inicializarLobby = async () => {
      const salaGuardada = localStorage.getItem("miLobbyActual");
      
      if (salaGuardada) {
        await cargarLobby(salaGuardada);
      } else {
        const nuevoIdLobby = await crearLobby(emailGuardado, nombreGuardado);
        if (nuevoIdLobby) {
          localStorage.setItem("miLobbyActual", nuevoIdLobby);
        }
      }
    };

    inicializarLobby();
  }, []);

  const esLider = lobby?.idCreador === miEmail;
  const salaLlena = lobby ? lobby.numJugadores >= 4 : false;

  const huecos = lobby 
    ? [0, 1, 2, 3].map(index => lobby.jugadores[index])
    : [undefined, undefined, undefined, undefined];

  return (
    <main className="h-full w-full flex flex-col bg-transparent overflow-y-auto">
      
      {/* CABECERA ORIGINAL */}
      <div className="flex justify-center items-center gap-12 text-2xl ">
        <h1 className="flex underline font-sans text-gray-400 cursor-pointer">Crear Partida</h1>
        <Link href="/juego/continuarpartida" className="flex text-white font-sans hover:text-gray-300">
          Continuar
        </Link>
      </div>

      {/* ZONA DE JUGADORES */}
      <div className="flex items-center justify-center flex-1 gap-10 md:gap-20 w-full max-w-6xl mx-auto pb-10">
        
        {/* COLUMNA IZQUIERDA */}
        <div className="flex flex-col gap-10 w-full max-w-[300px]">
          <HuecoJugador 
            estaOcupado={!!huecos[0]} 
            esLider={huecos[0]?.idJugador === lobby?.idCreador} 
            nomJugador={huecos[0]?.nombre} 
          />
          <HuecoJugador 
            estaOcupado={!!huecos[1]} 
            esLider={huecos[1]?.idJugador === lobby?.idCreador} 
            nomJugador={huecos[1]?.nombre} 
          />
        </div>

        {/* COLUMNA CENTRAL (Oculta si no hay error) */}
        <div className="flex flex-col items-center justify-center min-w-[50px]">
          {error && <p className="text-red-500 font-bold text-center max-w-xs">{error}</p>}
        </div>       

        {/* COLUMNA DERECHA */}
        <div className="flex flex-col gap-10 w-full max-w-[300px]">
          <HuecoJugador 
            estaOcupado={!!huecos[2]} 
            esLider={huecos[2]?.idJugador === lobby?.idCreador} 
            nomJugador={huecos[2]?.nombre} 
          />
          <HuecoJugador 
            estaOcupado={!!huecos[3]} 
            esLider={huecos[3]?.idJugador === lobby?.idCreador} 
            nomJugador={huecos[3]?.nombre} 
          />
        </div>

      </div>
    </main>
  );
}