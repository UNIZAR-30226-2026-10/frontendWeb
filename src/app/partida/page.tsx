"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useUser } from "@/context/userContext";
import { ListaJugadores } from "@/components/interfaz/ListaJugadores";
import { MazoVisual } from "@/components/interfaz/MazoPartida";
import Tablero from "../../components/interfaz/Tablero";
import { DadoPartida } from "@/components/interfaz/DadoPartida";
import { ModalCarta } from "@/components/interfaz/CartaPartida";
import type Carta from "@/types/carta";
import { usePartida } from "@/hooks/useMatches";

const EQUIPOS_TURNO = ["miEquipo", "equipoAzul", "equipoVerde", "equipoAmarillo"];

export default function Home() {
  const searchParams = useSearchParams();
  const partidaId = searchParams.get("matchId");

  const { username } = useUser();

  const {
    partida,
    cargandoPartida,
    errorPartida,
    tirarDado,
    moverFicha,
    jugarCarta,
    jugadores,
    tablero,
    ultimaTirada,
    tiradaExtra,
    tuTurno,
  } = usePartida({
    partidaId,
    username: username || undefined,
  });

  const [cartaEnFoco, setCartaEnFoco] = useState<Carta | null>(null);
  const [equipoActualIndex, setEquipoActualIndex] = useState(0);
  const [cartaJugadaEnEsteTurno, setCartaJugadaEnEsteTurno] = useState(false);
  const [mazoEnMano, setMazoEnMano] = useState<Carta[]>([]);

  const equipoActual = EQUIPOS_TURNO[equipoActualIndex];

  const manejarUsoDeCarta = async (carta: Carta) => {
    if (cartaJugadaEnEsteTurno) {
      alert("Ya has jugado una carta en este turno.");
      return;
    }

    try {
      await jugarCarta(carta.nombre);

      setCartaJugadaEnEsteTurno(true);
      setCartaEnFoco(null);
    } catch (error) {
      console.error("Error al jugar carta:", error);
    }
  };

  if (!partidaId) {
    return (
      <div className="text-white text-center mt-10 text-2xl w-full font-bold">
        No se encontró la partida
      </div>
    );
  }

  if (cargandoPartida) {
    return (
      <div className="text-white text-center mt-10 text-2xl w-full font-bold">
        Cargando Partida...
      </div>
    );
  }

  if (errorPartida) {
    return (
      <div className="text-red-300 text-center mt-10 text-2xl w-full font-bold">
        {errorPartida}
      </div>
    );
  }

  if (!partida) {
    return (
      <div className="text-white text-center mt-10 text-2xl w-full font-bold">
        No se pudo cargar la partida
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-row p-4 gap-6 justify-between items-stretch bg-blue-700 min-h-0">
      <div className="flex flex-col w-60 lg:w-64 shrink-0 h-full gap-4 relative z-10">
        <div className="shrink-0 relative z-20">
          <ListaJugadores jugadores={jugadores} />
        </div>

        <div className="flex flex-col gap-2 relative z-10 min-h-0 flex-1">
          <h2 className="text-white text-sm font-bold">Mano: (3/4)</h2>
          <div className="w-full overflow-y-auto flex-1 pr-1 pb-2">
            <MazoVisual onSelectCarta={setCartaEnFoco} cartas={mazoEnMano} />
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-2 min-h-0 h-full">
        <Tablero
          equipoActual={equipoActual}
          snapshotTablero={tablero}
          onMoverFicha={(fichaId, nuevaPosicion, pasosRestantes) => {
            void moverFicha(fichaId, nuevaPosicion, pasosRestantes ?? 0);
          }}
        />
      </div>

      <div className="flex flex-col justify-evenly items-center w-60 lg:w-64 shrink-0 h-full pb-4">
        <div className="bg-yellow-500 rounded-[2rem] p-4 w-full flex flex-col items-center shadow-lg border-b-8 border-yellow-600">
          <span className="text-3xl bg-white rounded-full p-2 border-4 border-black mb-2">
            🐍
          </span>
          <h2 className="text-white text-3xl font-bold">Tú</h2>
        </div>

        <div className="flex flex-col items-center gap-2 w-full">
          <div className="text-center mb-2">
            <h2 className="text-white text-2xl font-bold">
              {tuTurno ? "Tu Turno" : "Espera tu turno"}
            </h2>
            <p className="text-blue-200 text-xs">*Haz click en el dado</p>
          </div>

          <DadoPartida
            resultado={ultimaTirada}
            resultadoAux={tiradaExtra}
            onTirar={async () => {
              await tirarDado();
            }}
            deshabilitado={!tuTurno}
          />
        </div>
      </div>

      <ModalCarta
        carta={cartaEnFoco}
        onClose={() => setCartaEnFoco(null)}
        onJugar={manejarUsoDeCarta}
        esMiTurno={tuTurno}
        yaJugadoCarta={cartaJugadaEnEsteTurno}
      />
    </div>
  );
}