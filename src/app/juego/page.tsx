import Link from "next/dist/client/link";
import React from "react";
import HuecoJugador from "@/components/interfaz/HuecoJugador";

export default function Home() {
  return (
    <main className="h-full overflow-hidden flex flex-col">
      <div className="flex justify-center items-center gap-12 text-2xl">
       <h1 className="flex underline font-sans text-gray-400">Crear Partida</h1>
      <Link href="/juego/continuarpartida"className="flex text-white font-sans">Continuar</Link>
      </div>
      <div className="flex items-center justify-center flex-1 gap-30 overflow-hidden">
        <div className="flex flex-col gap-10">
        {/* falta poner imagenes también, y el icono de líder */}
        <HuecoJugador estaOcupado={true} esLider={true} nomJugador="Jugador 1" />

        <HuecoJugador estaOcupado={false} />
        </div>
        <div>
            {/* Botón para elegir tablero, iniciar partida*/}
            <h1 className="text-xl">Placeholder</h1>
        </div>       
        <div className="flex flex-col gap-10">
        <HuecoJugador estaOcupado={false} />

        <HuecoJugador estaOcupado={false} />
        </div>     
      </div>
    </main>
  );
}
