"use client";

import React, { useMemo, useState } from "react";
import type {
  SnapshotTablero,
  JugadorEstado,
  PartidaJugador,
  Partida,
} from "@/types/partida";

type MovimientoDisponible = {
  fichaId: number;
  casillaDestino: number;
  esBifurcacion: boolean;
  pasosRestantes?: number;
};

type TableroProps = {
  equipoActual?: string;
  snapshotTablero?: SnapshotTablero | null;
  jugadores?: JugadorEstado[];
  partidaJugadores?: PartidaJugador[];
  movimientos?: MovimientoDisponible[];
  onMoverFicha?: (
    fichaId: number,
    casillaDestino: number,
    pasosRestantes: number
  ) => Promise<Partida| null>;
};

const IMAGENES = {
  VACIA: "casilla_vacia.png",
  NORMAL: "casilla_vertical.png",
  CURVA: "casilla_curva.png",
  META: "casilla_meta1.png",
  BIFURCACION: "casilla_bifurcacion.png",
};

const COLORES_JUGADOR = [
  "#ef4444",
  "#3b82f6",
  "#22c55e",
  "#eab308",
];

const NOMBRES_COLOR_JUGADOR = [
  "rojo",
  "azul",
  "verde",
  "amarillo",
];

export default function Tablero({
  snapshotTablero,
  onMoverFicha,
  equipoActual,
  jugadores = [],
  partidaJugadores = [],
  movimientos = [],
}: TableroProps) {
  const [bifurcacionPendiente, setBifurcacionPendiente] = useState<{
    movimiento: MovimientoDisponible;
    siguientes: number[];
  } | null>(null);

  const [escaleraPendiente, setEscaleraPendiente] = useState<{
    movimiento: MovimientoDisponible;
    base: number;
    cima: number;
    desdeBifurcacion?: boolean;
  } | null>(null);

  const [fichaSeleccionada, setFichaSeleccionada] = useState<number | null>(null);

  React.useEffect(() => {
    if (movimientos.length === 0) setFichaSeleccionada(null);
  }, [movimientos]);

  const casillas = snapshotTablero?.casillas ?? [];

  const fichasPorCasilla = useMemo(() => {
    const mapa: Record<
      number,
      {
        jugadorIndex: number;
        username: string;
        fichaId: number;
        color: string;
        imagen: string;
      }[]
    > = {};

    jugadores.forEach((jugador, jIndex) => {
      const pj = partidaJugadores.find((p) => p.nombre === jugador.username);
      const colorJugador = NOMBRES_COLOR_JUGADOR[
        jIndex % NOMBRES_COLOR_JUGADOR.length
      ];

      const fichaNombre = pj?.fichaActualField || "ficha_default";
      const fichaImg = `/${fichaNombre}_${colorJugador}.png`;

      jugador.fichas.forEach((ficha) => {
        if (!ficha.meta) {
          const casillaVisual = ficha.casilla + 1;

          if (!mapa[casillaVisual]) mapa[casillaVisual] = [];

          mapa[casillaVisual].push({
            jugadorIndex: jIndex,
            username: jugador.username,
            fichaId: ficha.id,
            color: COLORES_JUGADOR[jIndex % COLORES_JUGADOR.length],
            imagen: fichaImg,
          });
        }
      });
    });

    return mapa;
  }, [jugadores, partidaJugadores]);

  const destinosValidos = useMemo(() => {
    const mapa: Record<number, MovimientoDisponible> = {};

    if (fichaSeleccionada !== null) {
      movimientos.forEach((mov) => {
        if (mov.fichaId === fichaSeleccionada) {
          const casillaVisual = mov.casillaDestino + 1;
          mapa[casillaVisual] = mov;
        }
      });
    }

    return mapa;
  }, [movimientos, fichaSeleccionada]);

  const saltosDinamicos = useMemo<Record<number, number>>(() => {
    const saltos: Record<number, number> = {};
    snapshotTablero?.casillas?.forEach((casilla, index) => {
      if (casilla?.saltoA !== undefined) {
        saltos[index + 1] = casilla.saltoA + 1;
      }
    });
    return saltos;
  }, [snapshotTablero]);

  const obtenerCoordenadas = (casilla: number) => {
    const filaReal = Math.floor((casilla - 1) / 10);
    const colReal = (casilla - 1) % 10;
    const filaCSS = 9 - filaReal;

    return {
      x: colReal * 10 + 5,
      y: filaCSS * 10 + 5,
    };
  };
  const comprobarEscaleraTrasBifurcacion = (
  partidaActualizada: Partida | null,
  fichaId: number
) => {
  if (!partidaActualizada?.snapshotTablero){

    console.log("No hay partidaActualizada o snapshotTablero");
    return; 
  }

  const jugadorActualizado = partidaActualizada.snapshotJugadores.jugadores.find(
  (jugador) => jugador.username === equipoActual
);

const fichaActualizada = jugadorActualizado?.fichas.find(
  (ficha) => ficha.id === fichaId
);

  console.log("Ficha buscada:", fichaId);
  console.log("Ficha actualizada:", fichaActualizada);
  if (!fichaActualizada || fichaActualizada.meta) {
    console.log("No se encontró la ficha o está en meta");
    return;
  }

  const casillaFinal = fichaActualizada.casilla;
  const datosCasillaFinal =
    partidaActualizada.snapshotTablero.casillas[casillaFinal];

  if (
    datosCasillaFinal?.tipo === "Escalera" &&
    datosCasillaFinal.saltoA !== undefined
  ) {
    console.log("ABRIENDO POPUP ESCALERA DESDE BIFURCACIÓN");    
    setBifurcacionPendiente(null);
    setEscaleraPendiente({
      movimiento: {
        fichaId,
        casillaDestino: casillaFinal,
        esBifurcacion: false,
        pasosRestantes: 0,
      },
      base: casillaFinal,
      cima: datosCasillaFinal.saltoA,
      desdeBifurcacion: true,
    });
  } else {
    setBifurcacionPendiente(null);
    console.log("La casilla final no es escalera");
  }
};

  const renderizarObstaculosPNG = () => {
    return Object.entries(saltosDinamicos).map(([inicio, fin]) => {
      const inicioNumero = Number(inicio);
      const start = obtenerCoordenadas(inicioNumero);
      const end = obtenerCoordenadas(fin);
      const tipoInicio = snapshotTablero?.casillas[inicioNumero - 1]?.tipo;

      const dx = end.x - start.x;
      const dy = end.y - start.y;
      const longitud = Math.sqrt(dx * dx + dy * dy);
      const angulo = Math.atan2(dy, dx) * (180 / Math.PI);
      const esEscalera = tipoInicio === "Escalera";

      if (esEscalera) {
        const flipScale = dx < 0 ? " scaleY(-1)" : "";

        return (
          <div
            key={`${inicio}-${fin}`}
            className="absolute z-30 pointer-events-none drop-shadow-xl flex flex-row items-center justify-center"
            style={{
              left: `${start.x}%`,
              top: `${start.y}%`,
              width: `${longitud}%`,
              height: "8%",
              transformOrigin: "0% 50%",
              transform: `translateY(-50%) rotate(${angulo}deg)${flipScale}`,
            }}
          >
            <div className="h-full flex-shrink-0 overflow-hidden relative z-20">
              <img
                src="/escalera_estratega_base.png"
                alt="Base"
                className="h-full w-auto block max-w-none"
              />
            </div>

            <div
              className="h-full flex-1 relative z-10"
              style={{
                backgroundImage: "url(/escalera_estratega_cuerpo.png)",
                backgroundRepeat: "repeat-x",
                backgroundSize: "auto 100%",
                backgroundPosition: "left center",
                transform: "scaleX(1.03)",
              }}
            />

            <div className="h-full flex-shrink-0 overflow-hidden relative z-20">
              <img
                src="/escalera_estratega_tope.png"
                alt="Tope"
                className="h-full w-auto block max-w-none"
              />
            </div>
          </div>
        );
      }

      const flipScale = dx < 0 ? " scaleY(-1)" : "";

      return (
        <div
          key={`${inicio}-${fin}`}
          className="absolute z-30 pointer-events-none drop-shadow-xl flex flex-row items-center"
          style={{
            left: `${start.x}%`,
            top: `${start.y}%`,
            width: `${longitud}%`,
            height: "6.5%",
            transformOrigin: "0% 50%",
            transform: `translateY(-50%) rotate(${angulo}deg)${flipScale}`,
          }}
        >
          <div
            className="h-full flex-shrink-0 overflow-hidden"
            style={{ width: "52px" }}
          >
            <img
              src="/serpiente_futuro_cabeza.png"
              alt="Cabeza"
              className="h-full max-w-none"
              style={{
                width: "100%",
                height: "50%",
                transform: "translateY(46%) translateX(1%)",
              }}
            />
          </div>

          <div
            className="h-full flex-1"
            style={{
              backgroundImage: "url(/serpiente_futuro_cuerpo.png)",
              backgroundRepeat: "repeat-x",
              backgroundSize: "22px 44%",
              backgroundPosition: "left center",
            }}
          />

          <div
            className="h-full flex-shrink-0 overflow-hidden"
            style={{ width: "70px" }}
          >
            <img
              src="/serpiente_futuro_cola.png"
              alt="Cola"
              className="h-full max-w-none"
              style={{
                width: "140%",
                height: "113%",
                transform: "translateX(-29%) translateY(-5%)",
              }}
            />
          </div>
        </div>
      );
    });
  };

  const manejarClickCasilla = async (
    esDestino: MovimientoDisponible | undefined
  ) => {
    if (!esDestino || !onMoverFicha || !snapshotTablero) return;
    
    setFichaSeleccionada(null);

    const pasosRestantes = esDestino.pasosRestantes ?? 0;
    const destinoCasilla = snapshotTablero.casillas[esDestino.casillaDestino];

    // --- MANEJO DE SERPIENTES ---
    if (destinoCasilla?.tipo === "Serpiente" && destinoCasilla.saltoA !== undefined) {
      const miJugador = jugadores.find((j) => j.username === equipoActual);
      const tieneAntidoto = miJugador?.efectosActivos.some(
        (e) => e.resumenEfecto === "Antidoto"
      );

      if (!tieneAntidoto) {
        await onMoverFicha(
          esDestino.fichaId,
          destinoCasilla.saltoA,
          pasosRestantes
        );
        return;
      }
    }

    // --- MANEJO DE ESCALERAS ---
    if (destinoCasilla?.tipo === "Escalera" && destinoCasilla.saltoA !== undefined) {
      setEscaleraPendiente({
        movimiento: esDestino,
        base: esDestino.casillaDestino,
        cima: destinoCasilla.saltoA,
      });
      return;
    }

    if (esDestino.esBifurcacion && pasosRestantes > 0) {
      const casillaBifurcacion =
        snapshotTablero.casillas[esDestino.casillaDestino];

      const siguientes = casillaBifurcacion?.siguientes ?? [];

      await onMoverFicha(
        esDestino.fichaId,
        esDestino.casillaDestino,
        pasosRestantes
      );

      if (siguientes.length === 1) {
        await onMoverFicha(esDestino.fichaId, siguientes[0], pasosRestantes);
        return;
      }

      if (siguientes.length > 1) {
        setBifurcacionPendiente({
          movimiento: esDestino,
          siguientes,
        });
        return;
      }

      return;
    }

    await onMoverFicha(
      esDestino.fichaId,
      esDestino.casillaDestino,
      pasosRestantes
    );
  };

  if (!snapshotTablero) {
    return (
      <div className="text-white text-center mt-10 text-2xl w-full font-bold">
        Cargando Tablero...
      </div>
    );
  }

  return (
    <div 
      className="flex flex-col items-center justify-center gap-2 h-full max-h-full w-full mx-auto p-2 min-h-0 relative"
      onClick={() => setFichaSeleccionada(null)}
    >
      <div className="h-full aspect-square max-w-full max-h-full bg-gray-900 p-1.5 rounded-2xl shadow-2xl shrink min-h-0 relative">
        <div className="w-full h-full grid grid-cols-10 grid-rows-10 relative overflow-hidden rounded-md">
          <div className="absolute inset-0 w-full h-full pointer-events-none z-30">
            {renderizarObstaculosPNG()}
          </div>

          {Array.from({ length: 100 }, (_, i) => {
            const filaVisual = Math.floor(i / 10);
            const colVisual = i % 10;

            const filaReal = 9 - filaVisual;
            const num = filaReal * 10 + colVisual + 1;

            const datosCasilla = casillas[num - 1];
            let imagenSrc = IMAGENES.VACIA;

            if (datosCasilla) {
              if (datosCasilla.tipo === "Meta") {
                imagenSrc = IMAGENES.META;
              } else if (datosCasilla.tipo === "Bifurcacion") {
                imagenSrc = IMAGENES.BIFURCACION;
              } else if (datosCasilla.esCurva) {
                imagenSrc = IMAGENES.CURVA;
              } else if (datosCasilla.tipo === "Vacía") {
                imagenSrc = IMAGENES.VACIA;
              } else {
                imagenSrc = IMAGENES.NORMAL;
              }
            }

            const rotacion = datosCasilla ? datosCasilla.rotacion : 0;
            const fichasEnCasilla = fichasPorCasilla[num] || [];
            const esDestino = destinosValidos[num];

            return (
              <div
                key={num}
                className={`relative flex items-center justify-center ${
                  esDestino ? "cursor-pointer" : ""
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  if (esDestino) {
                    void manejarClickCasilla(esDestino);
                  } else {
                    setFichaSeleccionada(null);
                  }
                }}
              >
                <div
                  className="absolute inset-0 w-full h-full z-0 pointer-events-none scale-105"
                  style={{
                    backgroundImage: `url(${imagenSrc})`,
                    backgroundSize: "100% 100%",
                    backgroundPosition: "center",
                    transform: `rotate(${rotacion}deg)`,
                  }}
                />

                {datosCasilla?.efecto && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center p-1 pointer-events-none">
                    <img
                      src={
                        datosCasilla.efecto === "-4"
                          ? "/efecto_menos_cuatro.png"
                          : datosCasilla.efecto === "+4"
                          ? "/efecto_mas_cuatro.png"
                          : datosCasilla.efecto === "Agujero de serpiente"
                          ? "/agujero_de_serpiente.png"
                          : datosCasilla.efecto === "Serpiente en tu bota"
                          ? "/serpiente_en_tu_bota.png"
                          : ""
                      }
                      alt={datosCasilla.efecto}
                      className="w-[85%] h-[85%] object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                    />
                  </div>
                )}

                {esDestino && (
                  <div className="absolute inset-0 z-20 rounded-sm border-2 border-yellow-300 bg-yellow-300/30 animate-pulse pointer-events-none" />
                )}

                {fichasEnCasilla.length > 0 &&
                  (() => {
                    const gruposPorJugador: Record<
                      string,
                      typeof fichasEnCasilla
                    > = {};

                    fichasEnCasilla.forEach((ficha) => {
                      if (!gruposPorJugador[ficha.username]) {
                        gruposPorJugador[ficha.username] = [];
                      }

                      gruposPorJugador[ficha.username].push(ficha);
                    });

                    const grupos = Object.values(gruposPorJugador);

                    return (
                      <div className="absolute inset-0 z-40 flex flex-wrap items-center justify-center gap-0.5 p-0.5 pointer-events-none">
                        {grupos.map((grupo) => {
                          const representante = grupo[0];
                          const cantidad = grupo.length;
                          
                          const tieneMovimiento = representante.username === equipoActual && movimientos.some(m => grupo.some(f => f.fichaId === m.fichaId));
                          const esSeleccionada = grupo.some(f => f.fichaId === fichaSeleccionada);

                          return (
                            <div
                              key={representante.username}
                              className={`rounded-full shadow-md flex items-center justify-center overflow-hidden relative transition-all duration-200 pointer-events-auto ${
                                tieneMovimiento ? 'cursor-pointer' : ''
                              }`}
                              style={{
                                width:
                                  grupos.length > 2
                                    ? "45%"
                                    : grupos.length > 1
                                    ? "50%"
                                    : "75%",
                                height:
                                  grupos.length > 2
                                    ? "45%"
                                    : grupos.length > 1
                                    ? "50%"
                                    : "75%",
                                backgroundColor: "transparent",
                              }}
                              title={`${representante.username} - ${cantidad} ficha${
                                cantidad > 1 ? "s" : ""
                              }`}
                              onClick={(e) => {
                                e.stopPropagation();
                                if (tieneMovimiento) {
                                  const movForGroup = movimientos.find(m => grupo.some(f => f.fichaId === m.fichaId));
                                  if (movForGroup) {
                                    setFichaSeleccionada(movForGroup.fichaId);
                                  }
                                } else {
                                  setFichaSeleccionada(null);
                                }
                              }}
                            >
                              <img
                                src={representante.imagen}
                                alt={`Ficha de ${representante.username}`}
                                className="w-full h-full object-contain"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src =
                                    "/ficha_default.png";
                                }}
                              />

                              {cantidad > 1 && (
                                <span
                                  className="absolute -top-0.5 -right-0.5 rounded-full flex items-center justify-center font-bold text-white"
                                  style={{
                                    backgroundColor: representante.color,
                                    width: "14px",
                                    height: "14px",
                                    fontSize: "9px",
                                    lineHeight: "1",
                                    border: "1px solid white",
                                  }}
                                >
                                  {cantidad}
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    );
                  })()}

                <span className="absolute top-0.5 left-1 text-[8px] lg:text-[10px] font-bold text-white/50 z-10 pointer-events-none select-none">
                  {num}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {bifurcacionPendiente && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60">
          <div className="w-80 rounded-2xl border-4 border-yellow-400 bg-blue-900 p-6 text-center shadow-2xl">
            <h2 className="mb-2 text-2xl font-black text-white">
              Bifurcación
            </h2>

            <p className="mb-2 text-sm font-semibold text-blue-100">
              Elige por dónde quieres continuar.
            </p>

            <p className="mb-5 text-lg font-black text-yellow-300">
              Quedan{" "}
              {bifurcacionPendiente.movimiento.pasosRestantes ?? 0} pasos por
              dar
            </p>

            <div className="flex justify-center gap-4">
              <button
                type="button"
                className="rounded-xl bg-yellow-400 px-5 py-3 font-black text-blue-950 shadow-lg transition hover:scale-105 active:scale-95"
                onClick={async () => {
                  if (!onMoverFicha || !bifurcacionPendiente) return;

                  const { movimiento, siguientes } = bifurcacionPendiente;
                  const destinoIzquierda = siguientes[0];

                  setBifurcacionPendiente(null);

                  const partidaActualizada = await onMoverFicha(
                    movimiento.fichaId,
                    destinoIzquierda,
                    movimiento.pasosRestantes ?? 0
                  );
                  if(partidaActualizada)
                  comprobarEscaleraTrasBifurcacion(
                    partidaActualizada,
                    movimiento.fichaId
                  );
                  
                }}
              >
                Direccion a la 
                <span className="block text-xs font-bold">
                  Casilla {bifurcacionPendiente.siguientes[0] + 1}
                </span>
              </button>

              <button
                type="button"
                className="rounded-xl bg-yellow-400 px-5 py-3 font-black text-blue-950 shadow-lg transition hover:scale-105 active:scale-95"
                  onClick={async () => {
                    if (!onMoverFicha || !bifurcacionPendiente) return;

                    const { movimiento, siguientes } = bifurcacionPendiente;
                    const destinoDerecha = siguientes[1];


                    const partidaActualizada = await onMoverFicha(
                      movimiento.fichaId,
                      destinoDerecha,
                      movimiento.pasosRestantes ?? 0
                    );
                      comprobarEscaleraTrasBifurcacion(
                        partidaActualizada,
                        movimiento.fichaId
                      );
          }}
              >
                Direccion a la
                <span className="block text-xs font-bold">
                  Casilla {bifurcacionPendiente.siguientes[1] + 1}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
      {escaleraPendiente && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60">
          <div className="w-80 rounded-2xl border-4 border-yellow-400 bg-blue-900 p-6 text-center shadow-2xl">
            <h2 className="mb-2 text-2xl font-black text-white">Escalera</h2>
            <p className="mb-4 text-sm font-semibold text-blue-100">
              ¿Quieres subir la escalera hasta la casilla {escaleraPendiente.cima + 1}?
            </p>
            <div className="flex justify-center gap-4">
              <button
                type="button"
                className="rounded-xl bg-green-500 px-5 py-3 font-black text-white shadow-lg transition hover:scale-105 active:scale-95 cursor-pointer"
                  onClick={async () => {
                    if (!onMoverFicha || !escaleraPendiente) return;

                    const { movimiento, cima, desdeBifurcacion } = escaleraPendiente;

                    setEscaleraPendiente(null);

                    await onMoverFicha(
                      movimiento.fichaId,
                      cima,
                      desdeBifurcacion ? -1 : movimiento.pasosRestantes ?? 0
                    );
                  }}
              >
                Subir
                <span className="block text-xs font-bold text-white/80">Casilla {escaleraPendiente.cima + 1}</span>
              </button>
              <button
                type="button"
                className="rounded-xl bg-red-500 px-5 py-3 font-black text-white shadow-lg transition hover:scale-105 active:scale-95 cursor-pointer"
                onClick={async () => {
                  if (!onMoverFicha || !escaleraPendiente) return;
                  const { movimiento, base,desdeBifurcacion } = escaleraPendiente;
                  const pasos = movimiento.pasosRestantes ?? 0;
                  setEscaleraPendiente(null);
                  if(desdeBifurcacion){
                    return;
                  }
                  await onMoverFicha(movimiento.fichaId, base, pasos);
                }}
              >
                Quedarse
                <span className="block text-xs font-bold text-white/80">Casilla {escaleraPendiente.base + 1}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}