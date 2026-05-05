'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import HuecoJugador from "@/components/interfaz/HuecoJugador";
import PopupSalirLobby from "@/components/interfaz/PopupSalirLobby";
import SelectorMazo from "@/components/interfaz/SelectorMazo";
import SelectorTablero from "@/components/interfaz/SelectorTablero";
import { useLobby } from "@/hooks/useLobby";
import { useUser } from "@/context/userContext";
import { Jugador } from "@/types/lobby";

export default function JuegoPrincipalPage() {
  const router = useRouter();

  // Extraemos directamente el username real del contexto (puede ser string | null aquí)
  const { username } = useUser();

  const {
    lobby,
    loading,
    error,
    crearLobby,
    obtenerLobby,
    marcarListo,
    seleccionarMazo,
    cambiarTablero,
    eliminarJugador,
    agregarBot,
    limpiarError
  } = useLobby();

  const [mostrarPopupSalir, setMostrarPopupSalir] = useState(false);
  const [mazoElegido, setMazoElegido] = useState("Mazo de Fuego");
  const [tableroElegido, setTableroElegido] = useState("Tablero 1");
  const [lobbyId, setLobbyId] = useState<string | null>(null);
  const [miPosicion, setMiPosicion] = useState<number>(0);
  const [estoyListo, setEstoyListo] = useState(false);

  useEffect(() => {
    const inicializarLobby = async () => {
      if (!username) return;

      const params = new URLSearchParams(window.location.search);
      const lobbyIdParam = params.get('lobbyId');

      if (lobbyIdParam) {
        await obtenerLobby(lobbyIdParam);
        setLobbyId(lobbyIdParam);
      } else {
        const nuevoLobby = await crearLobby();
        if (nuevoLobby) {
          setLobbyId(nuevoLobby.idLobby);
        }
      }
    };

    inicializarLobby();
  }, [username, crearLobby, obtenerLobby]);

  useEffect(() => {
    if (lobby && username) {
      const posicion = lobby.jugadores.findIndex(j => j.nombre === username);
      if (posicion !== -1) {
        setMiPosicion(posicion);
      }
    }
  }, [lobby, username]);


  // -------------------------------------------------------------------
  // BARRERA DE SEGURIDAD PARA TYPESCRIPT (¡Y PARA USUARIOS NO LOGUEADOS!)
  // Tiene que ir siempre DESPUÉS de todos los hooks.
  if (!username) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-[#0a0f2c] text-white">
        <h2 className="text-2xl font-bold mb-4">No estás conectado</h2>
        <p className="mb-6 text-gray-300">Debes iniciar sesión para entrar al lobby.</p>
        <button
          onClick={() => router.push('/')}
          className="bg-blue-600 hover:bg-blue-500 font-bold py-3 px-6 rounded-lg transition-colors shadow-lg"
        >
          Ir al Login
        </button>
      </div>
    );
  }
  // A partir de aquí, TypeScript sabe 100% que 'username' es un string válido
  // -------------------------------------------------------------------


  const huecos: (Jugador | undefined)[] = [
    lobby?.jugadores[0],
    lobby?.jugadores[1],
    lobby?.jugadores[2],
    lobby?.jugadores[3]
  ];

  const manejarAgregarBot = async () => {
    if (lobbyId && lobby?.idCreador === username) {
      await agregarBot(lobbyId);
    }
  };

  const manejarCambioMazo = async (nuevoMazo: string) => {
    setMazoElegido(nuevoMazo);
    if (lobbyId) {
      await seleccionarMazo(lobbyId, nuevoMazo);
    }
  };

  const manejarCambioTablero = async (nuevoTablero: string) => {
    setTableroElegido(nuevoTablero);
    if (lobbyId) {
      await cambiarTablero(lobbyId, nuevoTablero);
    }
  };

  const manejarMarcarListo = async () => {
    if (lobbyId) {
      await marcarListo(lobbyId, !estoyListo);
      setEstoyListo(!estoyListo);
    }
  };

  const manejarSalida = async () => {
    if (lobbyId) {
      await eliminarJugador(lobbyId, username);
      setMostrarPopupSalir(false);
      router.push('/juego');
    }
  };

  return (
    <main className="w-full h-full flex flex-col p-4 md:p-8 overflow-y-auto relative">
      {error && (
        <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-2 rounded mb-4 flex justify-between items-center">
          <span>{error}</span>
          <button onClick={limpiarError} className="text-red-200 hover:text-red-100">✕</button>
        </div>
      )}

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

        <div className="flex justify-center items-center gap-12 text-3xl mb-2 shrink-0">
          <h1 className="flex underline font-bold cursor-pointer">Crear Partida</h1>
          <Link href="/juego/continuarpartida" className="text-center font-bold hover:text-gray-300">
            Continuar
          </Link>
        </div>

        {loading && <span className="absolute right-0 text-gray-300 text-sm">Cargando...</span>}
      </div>

      <div className="flex items-center justify-center flex-1 gap-4 md:gap-12 w-full max-w-6xl mx-auto min-h-0 mt-4">

        <div className="flex flex-col justify-center gap-4 h-full w-full max-w-[300px] min-h-0">
          <div className="flex-1 min-h-0 flex flex-col justify-center">
            <HuecoJugador
              estaOcupado={!!huecos[0]}
              esLider={huecos[0]?.nombre === lobby?.idCreador}
              nomJugador={huecos[0]?.nombre}
              onAgregarBot={lobby?.idCreador === username ? manejarAgregarBot : undefined}
            />
          </div>
          <div className="flex-1 min-h-0 flex flex-col justify-center">
            <HuecoJugador
              estaOcupado={!!huecos[1]}
              esLider={huecos[1]?.nombre === lobby?.idCreador}
              nomJugador={huecos[1]?.nombre}
              onAgregarBot={lobby?.idCreador === username ? manejarAgregarBot : undefined}
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 min-w-[200px] w-full max-w-[250px] shrink-0 text-white h-full overflow-y-auto py-2">
          <SelectorMazo
            mazoSeleccionado={mazoElegido}
            onMazoSeleccionado={manejarCambioMazo}
          />

          {lobby?.idCreador === username && (
            <SelectorTablero
              tableroSeleccionado={tableroElegido}
              onTableroSeleccionado={manejarCambioTablero}
            />
          )}

          <button
            className={`w-full font-bold py-3 px-4 rounded-lg border-[#EFB810] border-white shadow-lg text-lg mt-2 transition-colors ${estoyListo
                ? 'bg-green-600 hover:bg-green-500'
                : 'bg-[#2078B4] hover:bg-[#00aeb5]'
              } text-white`}
            onClick={manejarMarcarListo}
            disabled={loading}
          >
            {estoyListo ? '✓ Listo' : 'Marcar como Listo'}
          </button>

          <button
            className="w-full bg-[#2078B4] hover:bg-[#00aeb5] text-white font-bold py-3 px-4 rounded-lg border-[#EFB810] border-white shadow-lg text-lg transition-colors disabled:opacity-50"
            onClick={() => router.push('/partida')}
            disabled={loading || !estoyListo}
          >
            Comenzar Partida
          </button>
        </div>

        <div className="flex flex-col justify-center gap-4 h-full w-full max-w-[300px] min-h-0">
          <div className="flex-1 min-h-0 flex flex-col justify-center">
            <HuecoJugador
              estaOcupado={!!huecos[2]}
              esLider={huecos[2]?.nombre === lobby?.idCreador}
              nomJugador={huecos[2]?.nombre}
              onAgregarBot={lobby?.idCreador === username ? manejarAgregarBot : undefined}
            />
          </div>
          <div className="flex-1 min-h-0 flex flex-col justify-center">
            <HuecoJugador
              estaOcupado={!!huecos[3]}
              esLider={huecos[3]?.nombre === lobby?.idCreador}
              nomJugador={huecos[3]?.nombre}
              onAgregarBot={lobby?.idCreador === username ? manejarAgregarBot : undefined}
            />
          </div>
        </div>

      </div>
    </main>
  );
}