import Link from "next/dist/client/link";
import React from "react";
import HuecoJugador from "@/components/interfaz/HuecoJugador";

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="flex justify-between text-2xl">
      <h1 className="flex underline font-sans pl-90 text-gray-400">Crear Partida</h1>
      <Link href="/continuarpartida"className="flex text-white font-sans pr-90">Continuar</Link>
      </div>
      <div className="flex items-center justify-center h-full gap-40 pt-10">
        <div className="flex flex-col gap-30">
        {/* falta poner imagenes también, y el icono de líder */}
        <HuecoJugador estaOcupado={true} esLider={true} nomJugador="Jugador 1" />

        <HuecoJugador estaOcupado={false} />
        </div>
        <div>
            {/* Botón para elegir tablero, iniciar partida*/}
            <h1 className="text-xl">Placeholder</h1>
        </div>       
        <div className="flex flex-col gap-30">
        <HuecoJugador estaOcupado={false} />

        <HuecoJugador estaOcupado={false} />
        </div>     
      </div>
    </main>
  );
}
