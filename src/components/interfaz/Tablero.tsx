"use client";
import React, { useState } from "react";

// Definición del tipo Ficha: representa una ficha en el tablero con su ID, posición y color
type Ficha = {
  id: string;
  posicion: number;
  color: string;
};

// Definición del tipo InfoCasilla: información de una casilla, incluyendo la imagen y rotación
type InfoCasilla = {
  src: string;
  rotacion: number;
};

// Constantes para las imágenes de las casillas del tablero
const IMAGENES = {
  VACIA: "casilla_vacia.png",
  HORIZONTAL: "casilla_horizontal.png",
  CURVA: "casilla_curva.png",
  BIFURCACION: "casilla_bifurcacion.png",
};

// Mapa inicial del tablero: define qué casillas tienen imágenes específicas (las demás son jungla vacía)
const mapaTablero: Record<number, InfoCasilla> = {
  // Ejemplo: Casilla 1 como salida horizontal
  1: { src: IMAGENES.HORIZONTAL, rotacion: 0 },
};

// Componente principal Tablero: maneja el estado del juego, las fichas y el tablero
export default function Tablero() {
  // Estado para las fichas del jugador: array de objetos Ficha
  const [misFichas, setMisFichas] = useState<Ficha[]>([
    { id: "Ficha 1", posicion: 1, color: "bg-red-400" },
    { id: "Ficha 2", posicion: 1, color: "bg-red-500" },
    { id: "Ficha 3", posicion: 1, color: "bg-red-600" }
  ]);

  // Estado para indicar si se está tirando el dado (animación)
  const [tirandoDado, setTirandoDado] = useState(false);

  // Estado para los movimientos permitidos por ficha: mapa de ID de ficha a array de posiciones posibles
  const [movimientosPermitidos, setMovimientosPermitidos] = useState<Record<string, number[]>>({});

  // Estado para la ficha seleccionada actualmente
  const [fichaSeleccionada, setFichaSeleccionada] = useState<string | null>(null);

  // Función para simular la tirada de dado: activa animación y simula respuesta del backend
  const simularTiradaDado = () => {
    setTirandoDado(true);
    setFichaSeleccionada(null);

    setTimeout(() => {
      // Respuesta simulada del backend: movimientos posibles por ficha
      const respuestaBackend = {
        "Ficha 1": [2, 11],
        "Ficha 2": [2],
        "Ficha 3": [2]
      };
      setMovimientosPermitidos(respuestaBackend);
      setTirandoDado(false);
    }, 1000);
  };

  // Función para seleccionar una ficha: marca la ficha como seleccionada si tiene movimientos
  const seleccionarFicha = (idFicha: string) => {
    if (movimientosPermitidos[idFicha] && movimientosPermitidos[idFicha].length > 0) {
      setFichaSeleccionada(idFicha);
    }
  };

  // Función para mover la ficha al destino seleccionado: actualiza la posición y resetea estados
  const moverFichaAlDestino = (casillaDestino: number) => {
    if (!fichaSeleccionada) return;
    setMisFichas(fichas =>
      fichas.map(f => f.id === fichaSeleccionada ? { ...f, posicion: casillaDestino } : f)
    );
    setMovimientosPermitidos({});
    setFichaSeleccionada(null);
  };

  // Genera un array de números del 1 al 100 para las casillas del tablero
  const casillas: number[] = [];
  
  // Bucle que va desde la fila superior (9) hasta la inferior (0)
  for (let fila = 9; fila >= 0; fila--) {
    for (let col = 1; col <= 10; col++) {
      // El 1 está abajo a la izquierda y el 100 arriba a la derecha.
      casillas.push(fila * 10 + col);
    }
  }
  // Destinos iluminados: posiciones posibles para la ficha seleccionada
  const destinosIluminados = fichaSeleccionada ? movimientosPermitidos[fichaSeleccionada] : [];

  // Verifica si hay movimientos pendientes (para deshabilitar el botón de tirar dado)
  const hayMovimientosPendientes = Object.keys(movimientosPermitidos).length > 0;

  // Renderizado del componente
  return (
    <div className="flex flex-col items-center justify-center gap-2 h-full max-h-full w-full mx-auto p-2 min-h-0 relative">

      {/* Sección del botón para tirar dados y mensaje de selección */}
      {fichaSeleccionada && (
        <div className="absolute top-4 z-50 bg-black/80 px-6 py-2 rounded-full pointer-events-none shadow-lg border border-green-500/30">
          <p className="text-green-400 font-bold animate-pulse text-lg">
            Moviendo {fichaSeleccionada}. ¡Elige una casilla verde!
          </p>
        </div>
      )}

      {/* Contenedor del tablero: grid de 10x10 casillas */}
      <div className="h-full aspect-square max-w-full max-h-full bg-gray-900 p-1.5 rounded-2xl shadow-2xl shrink min-h-0">
        <div className="w-full h-full grid grid-cols-10 grid-rows-10 relative overflow-hidden rounded-md">

          {/* Renderiza cada casilla del tablero */}
          {casillas.map((num) => {
            // Fichas en esta casilla
            const fichasAqui = misFichas.filter(f => f.posicion === num);
            // Si esta casilla es un destino posible
            const esDestinoPosible = destinosIluminados.includes(num);

            // Información de la casilla (imagen y rotación)
            const infoCasilla = mapaTablero[num] || { src: IMAGENES.VACIA, rotacion: 0 };

            return (
              <div
                key={num}
                onClick={() => esDestinoPosible && moverFichaAlDestino(num)}
                className={`
                  relative flex flex-wrap items-center justify-center gap-[2px] transition-all duration-300
                  ${esDestinoPosible ? "cursor-pointer ring-4 ring-green-300 ring-inset animate-pulse z-30 scale-105 shadow-[0_0_15px_rgba(34,197,94,0.8)]" : ""}
                  ${!esDestinoPosible && fichaSeleccionada ? "opacity-30" : ""}
                `}
              >
                {/* Fondo de la casilla con imagen */}
                <div
                  className="absolute inset-0 w-full h-full z-0 pointer-events-none scale-105"
                  style={{
                    backgroundImage: `url(${infoCasilla.src})`,
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center',
                    transform: `rotate(${infoCasilla.rotacion}deg)`
                  }}
                />
                {/* Renderiza las fichas en esta casilla */}
                {fichasAqui.map(ficha => {
                  // Si la ficha es seleccionable (tiene movimientos)
                  const esSeleccionable = movimientosPermitidos[ficha.id] !== undefined;
                  // Si esta ficha está seleccionada
                  const estaSeleccionada = fichaSeleccionada === ficha.id;

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
                    />
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