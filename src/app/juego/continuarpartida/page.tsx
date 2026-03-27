import Link from "next/dist/client/link";
import React from "react";
import SlotPartida from "@/components/interfaz/SlotPartida";
{/*hacer petición al back con las partidas pendientes del usuario actual, guardarlas en una lista de componentes de partida y 
    mostrarlas como lista en la página*/}

export default function ContinuarPartida() {
    return (
        <main className="min-h-screen">
            <div className="flex justify-center items-center gap-12 text-2xl ">
                <Link href="/juego" className="flex text-white font-sans hover:text-gray-300">Crear Partida</Link>
                <h1 className="flex underline font-sans text-gray-400 cursor-pointer">
                    Continuar
                </h1>
            </div>
            <ul className="mt-4 flex flex-col text-white w-full ">
                <SlotPartida jugadores={["Jugador 1", "Jugador 2"]} fechaCreacion="2024-06-01" turnoActual="Jugador 1" creadorPartida="Jugador 1"/>
                <SlotPartida jugadores={["Jugador 1", "Jugador 2", "Jugador 3"]} fechaCreacion="2024-06-02" turnoActual="Jugador 2" creadorPartida="Jugador 2"/>
            </ul>
        </main>
    );
}