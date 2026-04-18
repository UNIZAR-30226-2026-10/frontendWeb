"use client";

import { ListaJugadores } from "@/components/interfaz/ListaJugadores";
import { MazoVisual } from "@/components/interfaz/MazoPartida";
import Tablero from "@/components/interfaz/Tablero";
import Carta  from "@/types/carta";
import { DadoPartida } from "@/components/interfaz/DadoPartida";
import { ModalCarta } from "@/components/interfaz/CartaPartida";
import { useMemo, useState } from "react";

const EQUIPOS_TURNO = ["miEquipo", "equipoAzul", "equipoVerde", "equipoAmarillo"];

export default function Home() {
  const [cartaEnFoco, setCartaEnFoco] = useState<Carta | null>(null);
  const [equipoActualIndex, setEquipoActualIndex] = useState(0);
  const [valorDado, setValorDado] = useState<number | null>(null);
  const [cartaJugadaEnEsteTurno, setCartaJugadaEnEsteTurno] = useState(false);

  const equipoActual = EQUIPOS_TURNO[equipoActualIndex];
  const esMiTurno = equipoActual === "miEquipo";

  const jugadoresEjemplo = useMemo(
    () => [
      { nombreJugador: "Ana", esTurno: equipoActual === "miEquipo", esLider: true, colorFichas: "bg-red-400" },
      { nombreJugador: "Luis", esTurno: equipoActual === "equipoAzul", esLider: false, colorFichas: "bg-blue-400" },
      { nombreJugador: "Marta", esTurno: equipoActual === "equipoVerde", esLider: false, colorFichas: "bg-green-400" },
      { nombreJugador: "Diego", esTurno: equipoActual === "equipoAmarillo", esLider: false, colorFichas: "bg-yellow-400" },
    ],
    [equipoActual]
  );

  const avanzarTurno = () => {
    setValorDado(null);
    setCartaJugadaEnEsteTurno(false);
    setEquipoActualIndex((indice) => (indice + 1) % EQUIPOS_TURNO.length);
  };

  const manejarTirada = (valor: number) => {
    setValorDado(valor);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const manejarUsoDeCarta = (carta: any) => {
    // Aquí pondremos la lógica de Moisés después
    if (cartaJugadaEnEsteTurno) {
    alert("Ya has jugado una carta en este turno.");
    return;
    }

    console.log("Activando efecto de:", carta.nombre);
  
   // Marcamos que ya se usó la carta del turno
    setCartaJugadaEnEsteTurno(true);
  
    // Cerramos el modal
    setCartaEnFoco(null);
  };

  return (
    <div className="w-full h-full flex flex-row p-4 gap-6 justify-between items-stretch bg-blue-700 min-h-0">
      
      {/* COLUMNA IZQUIERDA */}
      <div className="flex flex-col w-48 lg:w-52 shrink-0 h-full gap-2">
        <ListaJugadores jugadores={jugadoresEjemplo} />
        <div className="flex flex-col gap-1 min-h-0">
          <h2 className="text-white text-sm font-bold">Mano: (3/4)</h2>
          <MazoVisual onSelectCarta={setCartaEnFoco} />
        </div>
      </div>

      {/* COLUMNA CENTRAL */}
      <div className="flex-1 flex items-center justify-center p-2 min-h-0 h-full">
        <Tablero
          equipoActual={equipoActual}
          onAvanzarTurno={avanzarTurno}
          onResetTurno={() => { setValorDado(null); setEquipoActualIndex(0); setCartaJugadaEnEsteTurno(false); }}
          valorDadoExterno={valorDado} // Nueva prop
          onTirarDadoManual={manejarTirada} // Para sincronizar si el tablero tira el dado
        />
      </div>

      {/* COLUMNA DERECHA */}
      <div className="flex flex-col justify-evenly items-center w-60 lg:w-64 shrink-0 h-full pb-4">
        {/* Perfil Jugador */}
        <div className="bg-yellow-500 rounded-[2rem] p-4 w-full flex flex-col items-center shadow-lg border-b-8 border-yellow-600">
          <span className="text-3xl bg-white rounded-full p-2 border-4 border-black mb-2">🐍</span>
          <h2 className="text-white text-3xl font-bold">Tú</h2>
        </div>

      

        {/* LÓGICA DEL DADO INTEGRADA */}
        <div className="flex flex-col items-center gap-2 w-full">
          <div className="text-center mb-2">
            <h2 className="text-white text-2xl font-bold">Tu Turno</h2>
            <p className="text-blue-200 text-xs">*Haz click en el dado</p>
          </div>
          
          <DadoPartida 
            resultado={valorDado}
            onTirar={() => {
                // Solo permitimos tirar si no hay un valor activo (o según tu lógica de juego)
                if (valorDado === null) {
                    const tirada = Math.floor(Math.random() * 6) + 1;
                    manejarTirada(tirada);
                }
            }}
            deshabilitado={valorDado !== null} // Opcional: bloquear tras tirar
          />
        </div>
      </div>

      <ModalCarta 
        carta={cartaEnFoco} 
        onClose={() => setCartaEnFoco(null)}
        onJugar={manejarUsoDeCarta}
        esMiTurno={esMiTurno}
        yaJugadoCarta={cartaJugadaEnEsteTurno}
      />
    </div>
  );
}