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
    // 1. EL TRUCO: flex-1 en lugar de h-full. Así solo ocupa el espacio RESTANTE debajo de tu barra superior.
    <main className="w-full h-full flex flex-col p-4 md:p-8 overflow-y-auto">
      
      {/* CABECERA (shrink-0 para que nunca se aplaste) */}
      <div className="flex justify-center items-center gap-12 text-3xl mb-2 shrink-0">
        <h1 className="flex underline font-bold text-gray-400 cursor-pointer">Crear Partida</h1>
        <Link href="/juego/continuarpartida" className="text-center font-bold hover:text-gray-300">
          Continuar
        </Link>
      </div>

      {/* ZONA DE JUGADORES */}
      <div className="flex items-center justify-center flex-1 gap-4 md:gap-12 w-full max-w-6xl mx-auto min-h-0">
        
        {/* COLUMNA IZQUIERDA */}
        <div className="flex flex-col justify-center gap-4 h-full w-full max-w-[300px] min-h-0">
          {/* 2. ENVOLTORIO ELÁSTICO: Esto obliga a la carta a no pasarse del límite */}
          <div className="flex-1 min-h-0 flex flex-col justify-center">
            <HuecoJugador 
              estaOcupado={!!huecos[0]} 
              esLider={huecos[0]?.idJugador === lobby?.idCreador} 
              nomJugador={huecos[0]?.nombre} 
            />
          </div>
          <div className="flex-1 min-h-0 flex flex-col justify-center">
            <HuecoJugador 
              estaOcupado={!!huecos[1]} 
              esLider={huecos[1]?.idJugador === lobby?.idCreador} 
              nomJugador={huecos[1]?.nombre} 
            />
          </div>
        </div>

        {/* COLUMNA CENTRAL (Oculta si no hay error) */}
        <div className="flex flex-col items-center justify-center min-w-[50px] shrink-0">
          {error && <p className="text-red-500 font-bold text-center max-w-xs">{error}</p>}
        </div>       

        {/* COLUMNA DERECHA */}
        <div className="flex flex-col justify-center gap-4 h-full w-full max-w-[300px] min-h-0">
          <div className="flex-1 min-h-0 flex flex-col justify-center">
            <HuecoJugador 
              estaOcupado={!!huecos[2]} 
              esLider={huecos[2]?.idJugador === lobby?.idCreador} 
              nomJugador={huecos[2]?.nombre} 
            />
          </div>
          <div className="flex-1 min-h-0 flex flex-col justify-center">
            <HuecoJugador 
              estaOcupado={!!huecos[3]} 
              esLider={huecos[3]?.idJugador === lobby?.idCreador} 
              nomJugador={huecos[3]?.nombre} 
            />
          </div>
        </div>

      </div>
    </main>
  );
}