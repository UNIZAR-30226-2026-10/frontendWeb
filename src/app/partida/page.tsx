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
    movimientos,
    tuTurno,
    miJugador,
    mazoEnMano,
  } = usePartida({
    partidaId,
    username: username || undefined,
  });

  const [cartaEnFoco, setCartaEnFoco] = useState<Carta | null>(null);

  // Info cosmética del jugador actual
  const miJugadorPJ = partida?.partidaJugadores.find(p => p.nombre === username) ?? null;
  const miIcono = miJugadorPJ?.iconoActualField
    ? `/${miJugadorPJ.iconoActualField}.png`
    : "/icono_default.png";

  const manejarUsoDeCarta = async (carta: Carta, who?: string | number, inicio?: number, fin?: number) => {
    if (miJugador?.cartaJugadaEnTurno) {
      alert("Ya has jugado una carta en este turno.");
      return;
    }

    try {
      await jugarCarta(carta.nombre, who, inicio, fin);
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

  if (cargandoPartida && !partida) {
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
          <h2 className="text-white text-sm font-bold">
            Mano: ({mazoEnMano.length}/{miJugador?.mano.length ?? 0})
          </h2>
          <div className="w-full overflow-y-auto flex-1 pr-1 pb-2">
            <MazoVisual onSelectCarta={setCartaEnFoco} cartas={mazoEnMano} />
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-2 min-h-0 h-full">
        <Tablero
          equipoActual={username ?? ""}
          snapshotTablero={tablero}
          jugadores={partida.snapshotJugadores.jugadores}
          partidaJugadores={partida.partidaJugadores}
          movimientos={movimientos}
          onMoverFicha={(fichaId, nuevaPosicion, pasosRestantes) => {
            void moverFicha(fichaId, nuevaPosicion, pasosRestantes ?? 0);
          }}
        />
      </div>

      <div className="flex flex-col justify-evenly items-center w-60 lg:w-64 shrink-0 h-full pb-4">
        <div className="bg-yellow-500 rounded-[2rem] p-4 w-full flex flex-col items-center shadow-lg border-b-8 border-yellow-600">
          <div className="w-16 h-16 bg-white rounded-full border-4 border-black mb-2 overflow-hidden flex items-center justify-center">
            <img
              src={miIcono}
              alt="Tu icono"
              className="w-full h-full object-contain"
              onError={(e) => { (e.target as HTMLImageElement).src = "/icono_default.png"; }}
            />
          </div>
          <h2 className="text-white text-3xl font-bold">{username ?? "Tú"}</h2>
        </div>

        <div className="flex flex-col items-center gap-2 w-full">
          <div className="text-center mb-2">
            <h2 className="text-white text-2xl font-bold">
              {tuTurno ? "Tu Turno" : "Espera tu turno"}
            </h2>
            {tuTurno && miJugador && (
              <p className="text-blue-200 text-xs">
                Fase: {miJugador.fase === "Cartas" ? "Juega una carta o tira el dado" : "Mueve una ficha"}
              </p>
            )}
          </div>

          <DadoPartida
            resultado={ultimaTirada}
            resultadoAux={tiradaExtra}
            onTirar={async () => {
              await tirarDado();
            }}
            deshabilitado={!tuTurno || miJugador?.fase !== "Cartas"}
          />

          {movimientos.length > 0 && (
            <div className="text-yellow-200 text-xs text-center mt-1">
              Selecciona una casilla para mover tu ficha
            </div>
          )}
        </div>
      </div>

      <ModalCarta
        carta={cartaEnFoco}
        onClose={() => setCartaEnFoco(null)}
        onJugar={manejarUsoDeCarta}
        esMiTurno={tuTurno}
        yaJugadoCarta={miJugador?.cartaJugadaEnTurno ?? false}
        jugadores={partida.snapshotJugadores.jugadores.filter(j => j.username !== username)}
      />
    </div>
  );
}
