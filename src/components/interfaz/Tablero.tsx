"use client";
import React, { useState } from "react";

// Definición de tipos
type Ficha = {
  id: string;
  posicion: number;
  color: string;
  equipo: string;
};

//Tipos definidos en el backend
type TipoCasilla = "Normal" | "Escalera" | "Serpiente" | "Bifurcacion" | "Meta";

interface CasillaBackend {
  esCurva: boolean;
  rotacion: number;
  efecto?: string;
  tipo: TipoCasilla;
  siguientes: number[];
  saltoA?: number;
}

interface SnapshotTablero {
  casillas: (CasillaBackend | undefined)[];
}


const IMAGENES = {
  VACIA: "casilla_vacia.png",
  NORMAL: "casilla_vertical.png", 
  CURVA: "casilla_curva.png",
  BIFURCACION: "casilla_bifurcacion.png",
};

const sparseCasillasArray = new Array(100); // Creamos array de 100 huecos

for (let i = 0; i < 50; i++) {
    sparseCasillasArray[i] = { esCurva: false, rotacion: 90, tipo: "Normal", siguientes: [i+2] };
}

sparseCasillasArray[16] = { esCurva: false, rotacion: 90, tipo: "Serpiente", siguientes: [18], saltoA: 9 };

sparseCasillasArray[8] = { esCurva: false, rotacion: 90, tipo: "Serpiente", siguientes: [10] };


// Aquí es donde en el futuro habrá un fetch(). 
const MOCK_BACKEND_DATA: SnapshotTablero = {
    casillas: sparseCasillasArray
};

const esperar = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export default function Tablero() {
  const [misFichas, setMisFichas] = useState<Ficha[]>([
    { id: "Ficha 1", posicion: 1, color: "bg-red-400", equipo: "miEquipo" },
    { id: "Ficha 2", posicion: 1, color: "bg-red-500", equipo: "miEquipo" },
    { id: "Ficha 3", posicion: 1, color: "bg-red-600", equipo: "miEquipo" },

    { id: "Jugador 2 - Ficha 1", posicion: 1, color: "bg-blue-400", equipo: "equipoAzul" },
    { id: "Jugador 2 - Ficha 2", posicion: 1, color: "bg-blue-500", equipo: "equipoAzul" },
    { id: "Jugador 2 - Ficha 3", posicion: 1, color: "bg-blue-600", equipo: "equipoAzul" },

    { id: "Jugador 3 - Ficha 1", posicion: 1, color: "bg-green-400", equipo: "equipoVerde" },
    { id: "Jugador 3 - Ficha 2", posicion: 1, color: "bg-green-500", equipo: "equipoVerde" },
    { id: "Jugador 3 - Ficha 3", posicion: 1, color: "bg-green-600", equipo: "equipoVerde" },

    { id: "Jugador 4 - Ficha 1", posicion: 1, color: "bg-yellow-300", equipo: "equipoAmarillo" },
    { id: "Jugador 4 - Ficha 2", posicion: 1, color: "bg-yellow-400", equipo: "equipoAmarillo" },
    { id: "Jugador 4 - Ficha 3", posicion: 1, color: "bg-yellow-500", equipo: "equipoAmarillo" }
  ]);

  const [movimientosPermitidos, setMovimientosPermitidos] = useState<Record<string, number[]>>({});
  const [fichaSeleccionada, setFichaSeleccionada] = useState<string | null>(null);

  const saltosDinamicos: Record<number, number> = {};
  MOCK_BACKEND_DATA.casillas?.forEach((casilla, index) => {
    if (casilla && casilla.saltoA !== undefined) {
      saltosDinamicos[index + 1] = casilla.saltoA;
    }
  });


  //LÓGICA TEMPORAL
  const simularTiradaDado = () => {
    setFichaSeleccionada(null);
    setMovimientosPermitidos({
      "Ficha 1": [17, 20],
      "Ficha 2": [2],
      "Ficha 3": [2],
      "Jugador 2 - Ficha 1": [2],
      "Jugador 3 - Ficha 1": [2],
      "Jugador 4 - Ficha 1": [2]
    });
  };

  const seleccionarFicha = (idFicha: string) => {
    if (movimientosPermitidos[idFicha] && movimientosPermitidos[idFicha].length > 0) {
      setFichaSeleccionada(idFicha);
    }
  };

  const moverFichaAlDestino = async (casillaDestino: number) => {
    if (!fichaSeleccionada) return;

    const fichaActual = fichaSeleccionada;
    setMovimientosPermitidos({});
    setFichaSeleccionada(null);

    let rutaAnimacion = [casillaDestino];

    if (casillaDestino === 17) {
      rutaAnimacion = [17, 9, 3]; 
    } else if (casillaDestino === 20) {
      rutaAnimacion = [20, 38]; 
    }

    for (let i = 0; i < rutaAnimacion.length; i++) {
      const parada = rutaAnimacion[i];

      setMisFichas(fichas =>
        fichas.map(f => f.id === fichaActual ? { ...f, posicion: parada } : f)
      );

      if (i < rutaAnimacion.length - 1) {
        await esperar(800);
      }
    }
  };

  // Generamos el tablero de abajo hacia arriba
  const casillas: number[] = [];
  for (let fila = 9; fila >= 0; fila--) {
    for (let col = 1; col <= 10; col++) {
      casillas.push(fila * 10 + col);
    }
  }

  const destinosIluminados = fichaSeleccionada ? movimientosPermitidos[fichaSeleccionada] : [];

  const renderizarObstaculosPNG = () => {
    const obtenerCoordenadas = (casilla: number) => {
      const filaReal = Math.floor((casilla - 1) / 10); 
      const colReal = (casilla - 1) % 10; 
      const filaCSS = 9 - filaReal; 
      return {
        x: colReal * 10 + 5, 
        y: filaCSS * 10 + 5
      };
    };

    // Usamos el saltosDinamicos que hemos generado a partir del JSON del backend
    return Object.entries(saltosDinamicos).map(([inicio, fin]) => {
      const start = obtenerCoordenadas(Number(inicio));
      const end = obtenerCoordenadas(fin);
      
      const dx = end.x - start.x;
      const dy = end.y - start.y;
      
      const longitud = Math.sqrt(dx * dx + dy * dy);
      const angulo = Math.atan2(dy, dx) * (180 / Math.PI);
      const esEscalera = fin > Number(inicio);

      return (
        <img
          key={`${inicio}-${fin}`}
          src={esEscalera ? "/escalera.png" : "/serpiente.png"} 
          alt={esEscalera ? "Escalera" : "Serpiente"}
          className="absolute z-30 pointer-events-none drop-shadow-xl"
          style={{
            left: `${start.x}%`,
            top: `calc(${start.y}% - 9%)`,
            width: `${longitud}%`,
            height: '18%',
            transformOrigin: '0% 50%',
            transform: `rotate(${angulo}deg)`
          }}
        />
      );
    });
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2 h-full max-h-full w-full mx-auto p-2 min-h-0 relative">

      {fichaSeleccionada && (
        <div className="absolute top-4 z-50 bg-black/80 px-6 py-2 rounded-full pointer-events-none shadow-lg border border-green-500/30">
          <p className="text-green-400 font-bold animate-pulse text-lg">
            Moviendo {fichaSeleccionada}. ¡Elige una casilla verde!
          </p>
        </div>
      )}

      {/* Botón temporal de prueba */}
      <button
        onClick={simularTiradaDado}
        className="absolute -top-10 z-50 px-4 py-1 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded shadow transition-all"
      >
        Probar Saltos
      </button>

      {/* CONTENEDOR DEL TABLERO */}
      <div className="h-full aspect-square max-w-full max-h-full bg-gray-900 p-1.5 rounded-2xl shadow-2xl shrink min-h-0 relative">
        <div className="w-full h-full grid grid-cols-10 grid-rows-10 relative overflow-hidden rounded-md">
          
          <div className="absolute inset-0 w-full h-full pointer-events-none z-30">
            {renderizarObstaculosPNG()}
          </div>

          {/* DIBUJO DE LAS CASILLAS Y LAS FICHAS */}
          {casillas.map((num) => {
            const fichasAqui = misFichas.filter(f => f.posicion === num);
        
            const datosCasilla = MOCK_BACKEND_DATA.casillas?.[num - 1]; // num empieza en 1, el array en 0
            
            let imagenSrc = IMAGENES.VACIA;
            if (datosCasilla) {
              if (datosCasilla.tipo === "Bifurcacion") {
                imagenSrc = IMAGENES.BIFURCACION;
              } else if (datosCasilla.esCurva) {
                imagenSrc = IMAGENES.CURVA;
              } else if (datosCasilla.tipo === "Normal") {
                imagenSrc = IMAGENES.NORMAL;
              }
            }

            const rotacion = datosCasilla ? datosCasilla.rotacion : 0;

            const fichasAgrupadasPorEquipo = fichasAqui.reduce<Record<string, Ficha[]>>((grupos, ficha) => {
              if (!grupos[ficha.equipo]) {
                grupos[ficha.equipo] = [];
              }
              grupos[ficha.equipo].push(ficha);
              return grupos;
            }, {});
            
            const fichasVisibles = Object.values(fichasAgrupadasPorEquipo).map((grupo) => {
                const tieneFichaSeleccionada = grupo.find(f => f.id === fichaSeleccionada);
                if(tieneFichaSeleccionada) return tieneFichaSeleccionada;
                return grupo[0];
            });


            const esDestinoPosible = destinosIluminados.includes(num);

            return (
              <div
                key={num}
                onClick={() => esDestinoPosible && moverFichaAlDestino(num)}
                className={`
                  relative flex flex-wrap items-center justify-center gap-[2px] transition-all duration-300
                  ${esDestinoPosible ? "cursor-pointer ring-4 ring-green-300 ring-inset animate-pulse z-40 scale-105 shadow-[0_0_15px_rgba(34,197,94,0.8)]" : ""}
                  ${!esDestinoPosible && fichaSeleccionada ? "opacity-30" : ""}
                `}
              >
                <div
                  className="absolute inset-0 w-full h-full z-0 pointer-events-none scale-105"
                  style={{
                    backgroundImage: `url(${imagenSrc})`,
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center',
                    transform: `rotate(${rotacion}deg)`
                  }}
                />
                
                {fichasVisibles.map(ficha => {
                  const esSeleccionable = movimientosPermitidos[ficha.id] !== undefined;
                  const estaSeleccionada = fichaSeleccionada === ficha.id;
                  const cantidadEquipoEnCasilla = fichasAgrupadasPorEquipo[ficha.equipo]?.length ?? 1;

                  return (
                    <div
                      key={ficha.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        seleccionarFicha(ficha.id);
                      }}
                      className={`
                        w-[38%] aspect-square rounded-full ${ficha.color} border border-white/80 shadow-md transition-all z-20 relative
                        ${esSeleccionable && !fichaSeleccionada ? "cursor-pointer ring-2 ring-yellow-400 hover:scale-110" : ""}
                        ${estaSeleccionada ? "scale-150 ring-4 ring-blue-400 shadow-[0_0_15px_blue]" : ""}
                      `}
                      title={ficha.id}
                    >
                      {cantidadEquipoEnCasilla > 1 && (
                        <span className="absolute -top-1 -right-1 z-30 w-4 h-4 rounded-full bg-black/85 text-white text-[9px] font-bold flex items-center justify-center border border-white/60 pointer-events-none">
                          {cantidadEquipoEnCasilla}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}