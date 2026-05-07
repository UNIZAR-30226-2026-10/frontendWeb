'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import HuecoJugador from "@/components/interfaz/HuecoJugador";
import PopupSalirLobby from "@/components/interfaz/PopupSalirLobby";
import SelectorMazo from "@/components/interfaz/SelectorMazo";
import SelectorTablero from "@/components/interfaz/SelectorTablero";
import { useLobby } from "@/hooks/useLobby";
import { useMazos } from "@/hooks/useMazos";
import { useUser } from "@/context/userContext";
import { Jugador } from "@/types/lobby";
import { LobbiesService } from "@/services/lobbies.service";
import { MatchesService } from "@/services/matches.service";
import { Partida } from "@/types/partida";

export default function JuegoPrincipalPage() {
  const router = useRouter();

  // Extraemos directamente el username real del contexto (puede ser string | null aquí)
  const { username, userEmail } = useUser();
  const { decks, isLoading: isLoadingDecks } = useMazos(userEmail || '');

  const {
    lobby,
    loading,
    error,
    crearLobby,
    obtenerLobby,
    obtenerLobbyDeJugador,
    marcarListo,
    seleccionarMazo,
    cambiarTablero,
    eliminarJugador,
    agregarBot,
    limpiarError,
    limpiarLobby
  } = useLobby();

  const [mostrarPopupSalir, setMostrarPopupSalir] = useState(false);
  const [mazoElegido, setMazoElegido] = useState("Mazo de Fuego");
  const [tableroElegido, setTableroElegido] = useState("Tablero 1");
  const [tablerosDisponibles, setTablerosDisponibles] = useState<string[]>([]);
  const [lobbyId, setLobbyId] = useState<string | null>(null);
  const [miPosicion, setMiPosicion] = useState<number>(0);
  const [estoyListo, setEstoyListo] = useState(false);
  const inicializadoRef = useRef(false);

  useEffect(() => {
    const inicializarLobby = async () => {
      if (!username) return;
      if (inicializadoRef.current) return; // evitar doble ejecución
      inicializadoRef.current = true;

      const params = new URLSearchParams(window.location.search);
      const lobbyIdParam = params.get('lobbyId');

      if (lobbyIdParam) {
        await obtenerLobby(lobbyIdParam);
        setLobbyId(lobbyIdParam);
      } else {
        // Primero comprobar si el jugador ya está en un lobby
        const lobbyExistente = await obtenerLobbyDeJugador();
        if (lobbyExistente) {
          setLobbyId(lobbyExistente.idLobby);
        } else {
          // No está en ningún lobby, crear uno nuevo
          const nuevoLobby = await crearLobby();
          if (nuevoLobby) {
            setLobbyId(nuevoLobby.idLobby);
          }
        }
      }
    };

    inicializarLobby();
  }, [username, crearLobby, obtenerLobby, obtenerLobbyDeJugador]);

  useEffect(() => {
    if (lobby && username) {
      const posicion = lobby.jugadores.findIndex(j => j.nombre === username);
      if (posicion !== -1) {
        setMiPosicion(posicion);
      }
    }
  }, [lobby, username]);

  useEffect(() => {
    if (!username) return;

    const miJugadorEnLobby = lobby?.jugadores.find(j => j.nombre === username);
    if (miJugadorEnLobby?.nombreMazo) {
      setMazoElegido(miJugadorEnLobby.nombreMazo);
      return;
    }

    if (decks.length > 0) {
      const existeMazoSeleccionado = decks.some(d => d.nombre === mazoElegido);
      if (!existeMazoSeleccionado) {
        setMazoElegido(decks[0].nombre);
      }
    }
  }, [decks, lobby, username, mazoElegido]);

  useEffect(() => {
    const cargarTableros = async () => {
      try {
        const data = await LobbiesService.obtenerTablerosDisponibles();
        setTablerosDisponibles(data);
      } catch (err) {
        console.error("Error al obtener los tableros disponibles:", err);
      }
    };
    cargarTableros();
  }, []);

  useEffect(() => {
    if (lobby?.tablero) {
      setTableroElegido(lobby.tablero);
    }
  }, [lobby?.tablero]);

  useEffect(() => {
    if (!username || !lobbyId) return;

    const verificarLobbyActivo = async () => {
      const lobbyActual = await obtenerLobbyDeJugador();

      if (!lobbyActual) {
        limpiarLobby();
        const nuevoLobby = await crearLobby();
        if (nuevoLobby) {
          setLobbyId(nuevoLobby.idLobby);
        }
      } else if (lobbyActual.idPartida) {
        router.push(`/partida?matchId=${encodeURIComponent(lobbyActual.idPartida)}`);
      }
    };

    const intervalId = window.setInterval(verificarLobbyActivo, 5000);
    return () => window.clearInterval(intervalId);
  }, [username, lobbyId, obtenerLobbyDeJugador, crearLobby, limpiarLobby]);


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

  const manejarEliminarBot = async (nombreBot: string) => {
    if (lobbyId && lobby?.idCreador === username) {
      await eliminarJugador(lobbyId, nombreBot);
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
      // 1. Eliminar el jugador de la lobby actual
      await eliminarJugador(lobbyId, username);
      setMostrarPopupSalir(false);
      
      // 2. Crear una nueva lobby
      const nuevoLobby = await crearLobby();
      if (nuevoLobby) {
        setLobbyId(nuevoLobby.idLobby);

        setEstoyListo(false);
      }
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
              iconoJugador={huecos[0]?.icono}
              esBot={huecos[0]?.esIA}
              onAgregarBot={lobby?.idCreador === username ? manejarAgregarBot : undefined}
              onEliminarBot={huecos[0] && huecos[0].nombre !== lobby?.idCreador && lobby?.idCreador === username ? () => manejarEliminarBot(huecos[0]!.nombre) : undefined}
            />
          </div>
          <div className="flex-1 min-h-0 flex flex-col justify-center">
            <HuecoJugador
              estaOcupado={!!huecos[1]}
              esLider={huecos[1]?.nombre === lobby?.idCreador}
              nomJugador={huecos[1]?.nombre}
              iconoJugador={huecos[1]?.icono}
              esBot={huecos[1]?.esIA}
              onAgregarBot={lobby?.idCreador === username ? manejarAgregarBot : undefined}
              onEliminarBot={huecos[1] && huecos[1].nombre !== lobby?.idCreador && lobby?.idCreador === username ? () => manejarEliminarBot(huecos[1]!.nombre) : undefined}
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 min-w-[200px] w-full max-w-[250px] shrink-0 text-white h-full overflow-y-auto py-2">
          <SelectorMazo
            mazoSeleccionado={mazoElegido}
            onMazoSeleccionado={manejarCambioMazo}
            mazosDisponibles={decks.map(d => d.nombre)}
            isLoading={isLoadingDecks}
          />

          {lobby?.idCreador === username && (
            <SelectorTablero
              tableroSeleccionado={tableroElegido}
              onTableroSeleccionado={manejarCambioTablero}
              tablerosDisponibles={tablerosDisponibles}
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

          {lobby?.idCreador === username && (
            <button
              className="w-full bg-[#2078B4] hover:bg-[#00aeb5] text-white font-bold py-3 px-4 rounded-lg border-[#EFB810] border-white shadow-lg text-lg transition-colors disabled:opacity-50"
              onClick={async () => {
                if(!lobby?.idLobby) return;
                try{
                  const partida = await MatchesService.iniciarPartida(lobby?.idLobby)
                  router.push(`/partida?matchId=${encodeURIComponent(partida.ID)}`);
                }
                catch(err) {
                  console.error("Error al iniciar la partida:", err);
                }
              }}
              disabled={loading || !estoyListo}
            >
              Comenzar Partida
            </button>
          )}
        </div>

        <div className="flex flex-col justify-center gap-4 h-full w-full max-w-[300px] min-h-0">
          <div className="flex-1 min-h-0 flex flex-col justify-center">
            <HuecoJugador
              estaOcupado={!!huecos[2]}
              esLider={huecos[2]?.nombre === lobby?.idCreador}
              nomJugador={huecos[2]?.nombre}
              iconoJugador={huecos[2]?.icono}
              esBot={huecos[2]?.esIA}
              onAgregarBot={lobby?.idCreador === username ? manejarAgregarBot : undefined}
              onEliminarBot={huecos[2] && huecos[2].nombre !== lobby?.idCreador && lobby?.idCreador === username ? () => manejarEliminarBot(huecos[2]!.nombre) : undefined}
            />
          </div>
          <div className="flex-1 min-h-0 flex flex-col justify-center">
            <HuecoJugador
              estaOcupado={!!huecos[3]}
              esLider={huecos[3]?.nombre === lobby?.idCreador}
              nomJugador={huecos[3]?.nombre}
              iconoJugador={huecos[3]?.icono}
              esBot={huecos[3]?.esIA}
              onAgregarBot={lobby?.idCreador === username ? manejarAgregarBot : undefined}
              onEliminarBot={huecos[3] && huecos[3].nombre !== lobby?.idCreador && lobby?.idCreador === username ? () => manejarEliminarBot(huecos[3]!.nombre) : undefined}
            />
          </div>
        </div>

      </div>
    </main>
  );
}