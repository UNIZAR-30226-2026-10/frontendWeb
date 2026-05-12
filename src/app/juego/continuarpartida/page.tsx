"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import SlotPartida from "@/components/interfaz/SlotPartida";
import { MatchesService } from "@/services/matches.service";
import { useUser } from "@/context/userContext";

interface MatchData {
    jugadores: string[];
    fecha: string;
    mapa: string;
    ID: string;
}

export default function ContinuarPartida() {
    const { userEmail } = useUser();
    const [partidas, setPartidas] = useState<MatchData[]>([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const cargarPartidas = async () => {
            if (!userEmail) {
                setCargando(false);
                return;
            }
            try {
                const data = await MatchesService.obtenerPartidasPendientes(userEmail);
                const partidasCompletas = await Promise.all(data.matches.map(async (partida) => {
                    try {
                        const estado = await MatchesService.obtenerEstadoPartida(partida.ID, userEmail);
                        return {
                            ...partida,
                            jugadores: estado.snapshotJugadores.jugadores.map((j) => j.username)
                        };
                    } catch (e) {
                        return partida;
                    }
                }));
                setPartidas(partidasCompletas);
            } catch (error) {
                console.error("Error al cargar las partidas pendientes:", error);
            } finally {
                setCargando(false);
            }
        };

        cargarPartidas();
    }, [userEmail]);

    return (
        <main className="min-h-screen w-full h-full flex flex-col p-4 md:p-8 overflow-y-auto relative text-white">
            <div className="flex justify-center items-center gap-12 text-3xl mb-2 shrink-0">
                <Link href="/juego" className="text-center font-bold hover:text-gray-300">
                    Crear Partida
                </Link>
                <h1 className="flex underline font-bold cursor-pointer text-white">
                    Continuar
                </h1>
            </div>

            {cargando ? (
                <div className="text-center mt-10 text-xl font-bold">Cargando partidas...</div>
            ) : partidas.length === 0 ? (
                <div className="text-center mt-10 text-xl font-bold">No tienes partidas pendientes.</div>
            ) : (
                <ul className="mt-8 flex flex-col w-full max-w-7xl mx-auto gap-2">
                    {partidas.map((partida) => (
                        <SlotPartida
                            key={partida.ID}
                            jugadores={partida.jugadores}
                            fecha={partida.fecha}
                            mapa={partida.mapa}
                            ID={partida.ID}
                        />
                    ))}
                </ul>
            )}
        </main>
    );
}