"use client";
import React, { useState, useEffect } from "react";
import { generarTableros, type SnapshotTablero } from "./tableros";

// Definición de tipos
type Ficha = {
  id: string;
  posicion: number;
  color: string;
  equipo: string;
};



interface TableroProps {
  equipoActual: string;
  onAvanzarTurno: () => void;
  onResetTurno: () => void;
  valorDadoExterno: number | null;
  onTirarDadoManual: (valor: number | null) => void;
}


const IMAGENES = {
  VACIA: "casilla_vacia.png",
  NORMAL: "casilla_vertical.png", 
  CURVA: "casilla_curva.png",
  META: "casilla_meta1.png",
  BIFURCACION: "casilla_bifurcacion.png",
};

const sparseCasillasArray = new Array(100);

for (let numeroCasilla = 1; numeroCasilla < 45; numeroCasilla++) {
  const indice = numeroCasilla - 1;
  const fila = Math.floor((numeroCasilla - 1) / 10);
  const enBordeDerecho = numeroCasilla % 10 === 0;
  const enBordeIzquierdo = numeroCasilla % 10 === 1;
  const filaPar = fila % 2 === 0;
  const ultimaFilaCamino = Math.floor((45 - 1) / 10);

  const inicioFila = filaPar ? fila * 10 + 1 : fila * 10 + 10;
  const finFila = filaPar ? fila * 10 + 10 : fila * 10 + 1;

  const esCurvaSubida = numeroCasilla === finFila && fila < ultimaFilaCamino;
  const esCurvaBajada = numeroCasilla === inicioFila && fila > 0;

  const esCurvaBorde = esCurvaSubida || esCurvaBajada;

  let rotacion = 90;
  if (esCurvaSubida) {
    rotacion = enBordeDerecho ? 180 : 270;
  } else if (esCurvaBajada) {
    rotacion = enBordeDerecho ? 90 : 0;
  }

  let siguiente: number | undefined;
  if (numeroCasilla < 45 ) {
    if (filaPar) {
      siguiente = enBordeDerecho ? numeroCasilla + 10 : numeroCasilla + 1;
    } else {
      siguiente = enBordeIzquierdo ? numeroCasilla + 10 : numeroCasilla - 1;
    }
  }

  sparseCasillasArray[indice] = {
    esCurva: esCurvaBorde,
    rotacion,
    tipo: "Normal",
    siguientes: siguiente !== undefined ? [siguiente] : []
  };
} 
sparseCasillasArray[44] = { esCurva: false, rotacion: 90, tipo: "Normal", siguientes: [46] };
sparseCasillasArray[45] = { esCurva: true, rotacion: 180, tipo: "Normal", siguientes: [56] };
for (let i = 51; i <= 90; i++) {
  const modulo = i % 10;
  const fila = Math.floor((i - 1) / 10);
  const esFilaInferior = (fila % 2) == 1;
  const filaPar = fila % 2 === 0;
  if(modulo==5){
    sparseCasillasArray[i - 1] = {
      esCurva: true,
      rotacion: esFilaInferior ? 0 : 270,
      tipo: "Normal",
      siguientes: esFilaInferior ? [i + 1] : [i + 10]
    };
  }
  if(modulo < 5 && modulo > 1){
    sparseCasillasArray[i - 1] = {
      esCurva: false,
      rotacion: 90,
      tipo: "Normal",
      siguientes: filaPar ? [i + 1] : [i - 1]
    };
  }
  if (modulo > 5 && modulo <= 9){
    sparseCasillasArray[i - 1] = {
      esCurva: false,
      rotacion: 90,
      tipo: "Normal",
      siguientes: filaPar ? [i - 1] : [i + 1]
    };
  }
  if(modulo ==0){
    sparseCasillasArray[i - 1] = {
      esCurva: true,
      rotacion: esFilaInferior ? 180 : 90,
      tipo: "Curva",
      siguientes: esFilaInferior ? [i + 10] : [i - 1]
    };
  }
  if(modulo ==1){
  sparseCasillasArray[i - 1] = {
      esCurva: true,
      rotacion: esFilaInferior ? 270 : 0,
      tipo: "Curva",
      siguientes: esFilaInferior ? [i + 10] : [i + 1]
    };
  }
  if(modulo ==4){
    sparseCasillasArray[i - 1] = {
      esCurva: true,
      rotacion: esFilaInferior ? 90 : 180,
      tipo: "Curva",
      siguientes: esFilaInferior ? [i - 1] : [i + 10]
    };
  }
}
sparseCasillasArray[53] = { esCurva: false, rotacion: 90, tipo: "Normal", siguientes: [53] };
sparseCasillasArray[54] = { esCurva: false, rotacion: 90, tipo: "Normal", siguientes: [54] };
sparseCasillasArray[55] = { esCurva: false, rotacion: 270, tipo: "Bifurcacion", siguientes: [57, 55] };
sparseCasillasArray[93] = { esCurva: true, rotacion: 0, tipo: "Curva", siguientes: [95] };
for(let i = 96; i < 100; i++) {
  sparseCasillasArray[i - 1] = { esCurva: false, rotacion: 90, tipo: "Normal", siguientes: [i+1] };
}
sparseCasillasArray[94] = { esCurva: false, rotacion: 270, tipo: "Bifurcacion", siguientes: [96] };
sparseCasillasArray[99] = { esCurva: false, rotacion: 270, tipo: "Meta", siguientes: [] };

//serpientes
sparseCasillasArray[16] = { esCurva: false, rotacion: 90, tipo: "Serpiente", siguientes: [16], saltoA: 9 };
sparseCasillasArray[53] = { esCurva: false, rotacion: 90, tipo: "Serpiente", siguientes: [53], saltoA: 43 };
sparseCasillasArray[67] = { esCurva: false, rotacion: 90, tipo: "Serpiente", siguientes: [67], saltoA: 19 };
sparseCasillasArray[82] = { esCurva: false, rotacion: 90, tipo: "Serpiente", siguientes: [82], saltoA: 56 };
sparseCasillasArray[98] = { esCurva: false, rotacion: 90, tipo: "Serpiente", siguientes: [100], saltoA: 25 };
//escaleras
sparseCasillasArray[6] = { esCurva: false, rotacion: 90, tipo: "Escalera", siguientes: [8], saltoA: 26 };
sparseCasillasArray[14] = { esCurva: false, rotacion: 90, tipo: "Escalera", siguientes: [14], saltoA: 31 };
sparseCasillasArray[50] = { esCurva: true, rotacion: 270, tipo: "Escalera", siguientes: [61], saltoA: 73 };
sparseCasillasArray[36] = { esCurva: false, rotacion: 90, tipo: "Escalera", siguientes: [36], saltoA: 98 };
sparseCasillasArray[64] = { esCurva: true, rotacion: 270, tipo: "Escalera", siguientes: [75], saltoA: 84 };


const MOCK_BACKEND_DATA: SnapshotTablero = generarTableros(3);

const obtenerDestinosTrasTirada = (casillaInicio: number, pasos: number): number[] => {
  const indiceInicio = casillaInicio - 1;
  const destinos = new Set<number>();

  const obtenerAnteriores = (indiceObjetivo: number): number[] => {
    const anteriores: number[] = [];
    MOCK_BACKEND_DATA.casillas.forEach((casilla, index) => {
      if (casilla?.siguientes.includes(indiceObjetivo)) {
        anteriores.push(index);
      }
    });
    return anteriores;
  };

  const obtenerReboteDesdeMeta = (indiceMeta: number, pasosSobrantes: number): number[] => {
    if (pasosSobrantes === 0) return [indiceMeta];
    const anteriores = obtenerAnteriores(indiceMeta);
    if (anteriores.length === 0) return [indiceMeta];
    return Array.from(new Set(anteriores.flatMap((anterior) => obtenerReboteDesdeMeta(anterior, pasosSobrantes - 1))));
  };

  const recorrer = (indiceActual: number, pasosRestantes: number, direccion: "adelante" | "atras" = "adelante") => {
    const datosCasilla = MOCK_BACKEND_DATA.casillas[indiceActual];
    const siguientes = datosCasilla?.siguientes ?? [];

    if (pasosRestantes === 0) {
      destinos.add(indiceActual);
      return;
    }

    if (direccion === "atras") {
      const anteriores = obtenerAnteriores(indiceActual);
      anteriores.forEach((anterior) => recorrer(anterior, pasosRestantes - 1, "atras"));
      return;
    }

    if (datosCasilla?.tipo === "Meta") {
      obtenerReboteDesdeMeta(indiceActual, pasosRestantes).forEach((destino) => destinos.add(destino));
      return;
    }

    if (pasosRestantes > 0 && datosCasilla?.tipo === "Bifurcacion" && siguientes.length > 1) {
      const pasosTrasElegirRama = pasosRestantes - 1;
      if (pasosTrasElegirRama <= 0) {
        siguientes.forEach((opcion) => destinos.add(opcion));
        return;
      }
      siguientes.forEach((opcion) => recorrer(opcion, pasosTrasElegirRama));
      return;
    }

    siguientes.forEach((siguiente) => recorrer(siguiente, pasosRestantes - 1));
  };

  recorrer(indiceInicio, pasos);
  destinos.delete(indiceInicio);

  return Array.from(destinos).map((indice) => indice + 1);
};

const esperar = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export default function Tablero({ equipoActual, onAvanzarTurno, onResetTurno, valorDadoExterno, onTirarDadoManual }: TableroProps) {
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
  const [confirmacionEscalera, setConfirmacionEscalera] = useState<{ fichaId: string; casillaBase: number; casillaSalto: number} | null>(null);

  const saltosDinamicos: Record<number, number> = {};
  MOCK_BACKEND_DATA.casillas?.forEach((casilla, index) => {
    if (casilla && casilla.saltoA !== undefined) {
      saltosDinamicos[index + 1] = casilla.saltoA + 1;
    }
  });

  useEffect(() => {
    if (valorDadoExterno === null) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMovimientosPermitidos({});
      return;
    }
    setFichaSeleccionada(null);

    const nuevosMovimientos = Object.fromEntries(
      misFichas.map((ficha) => {
        if (ficha.equipo !== equipoActual) return [ficha.id, []];
        const casillaActual = MOCK_BACKEND_DATA.casillas[ficha.posicion - 1];
        if (casillaActual?.tipo === "Meta") return [ficha.id, []];
        return [ficha.id, obtenerDestinosTrasTirada(ficha.posicion, valorDadoExterno)];
      })
    );
    setMovimientosPermitidos(nuevosMovimientos);
  }, [valorDadoExterno, equipoActual, misFichas]);

  const seleccionarFicha = (idFicha: string) => {
    const ficha = misFichas.find((f) => f.id === idFicha);
    if (ficha?.equipo !== equipoActual) return;
    if (movimientosPermitidos[idFicha] && movimientosPermitidos[idFicha].length > 0) {
      setFichaSeleccionada(idFicha);
    }
  };

  const resolverCadenaSerpientes = (casillaInicio: number): number[] => {
    const destinos: number[] = [];
    const visitadas = new Set<number>();
    let casillaActual = casillaInicio;

    while (!visitadas.has(casillaActual)) {
      visitadas.add(casillaActual);

      const datosCasilla = MOCK_BACKEND_DATA.casillas[casillaActual - 1];
      if (datosCasilla?.tipo !== "Serpiente" || datosCasilla.saltoA === undefined) {
        break;
      }

      const casillaDestino = datosCasilla.saltoA + 1;
      if (casillaDestino === casillaActual) {
        break;
      }

      destinos.push(casillaDestino);
      casillaActual = casillaDestino;
    }

    return destinos;
  };

  const ejecutarMovimientoFinal = async (fichaId: string, base: number, final: number) => {
    setMovimientosPermitidos({});
    setFichaSeleccionada(null);

    const cadenaSerpientes = resolverCadenaSerpientes(final);
    const trayectoria = base !== final ? [base, final, ...cadenaSerpientes] : [base, ...cadenaSerpientes];

    for (let i = 0; i < trayectoria.length; i++) {
      const destino = trayectoria[i];
      setMisFichas((f) => f.map((fi) => (fi.id === fichaId ? { ...fi, posicion: destino } : fi)));
      if (i < trayectoria.length - 1) {
        await esperar(800);
      }
    }
    
    onTirarDadoManual(null);
    onAvanzarTurno();
  };

  const moverFichaAlDestino = async (casillaDestino: number) => {
    if (!fichaSeleccionada) return;
    const fichaActual = fichaSeleccionada;
    const datosCasilla = MOCK_BACKEND_DATA.casillas[casillaDestino - 1];

    if (datosCasilla?.tipo === "Escalera" && datosCasilla.saltoA !== undefined) {
      setConfirmacionEscalera({ fichaId: fichaActual, casillaBase: casillaDestino, casillaSalto: datosCasilla.saltoA + 1 });
      return; 
    }
    ejecutarMovimientoFinal(
      fichaActual,
      casillaDestino,
      datosCasilla?.saltoA !== undefined ? datosCasilla.saltoA + 1 : casillaDestino
    );
  };

  const enviarFichasACasa = () => {
    setFichaSeleccionada(null);
    setMovimientosPermitidos({});
    onTirarDadoManual(null);
    setMisFichas((fichas) => fichas.map((ficha) => ({ ...ficha, posicion: 1 })));
    onResetTurno();
  };

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

    return Object.entries(saltosDinamicos).map(([inicio, fin]) => {
      const inicioNumero = Number(inicio);
      const start = obtenerCoordenadas(inicioNumero);
      const end = obtenerCoordenadas(fin);
      const tipoInicio = MOCK_BACKEND_DATA.casillas[inicioNumero - 1]?.tipo;
      
      const dx = end.x - start.x;
      const dy = end.y - start.y;
      
      const longitud = Math.sqrt(dx * dx + dy * dy);
      const angulo = Math.atan2(dy, dx) * (180 / Math.PI);
      const esEscalera = tipoInicio === "Escalera";

      if (esEscalera) {
        const flipScale = dx < 0 ? ' scaleY(-1)' : '';
        const grosorEscalera = '8%'; 

        return (
          <div
            key={`${inicio}-${fin}`}
            className="absolute z-30 pointer-events-none drop-shadow-xl flex flex-row items-center justify-center"
            style={{
              left: `${start.x}%`,
              top: `${start.y}%`,
              width: `${longitud}%`,
              height: grosorEscalera,
              transformOrigin: '0% 50%',
              transform: `translateY(-50%) rotate(${angulo}deg)${flipScale}`
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
                transform: "scaleX(1.03)"
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
      } else {
        const flipScale = dx < 0 ? " scaleY(-1)" : "";

        const altoSerpiente = "6.5%";
        const anchoCabeza = "52px";
        const anchoCola = "70px";
        const patronCuerpo = "22px 44%";

        return (
          <div
            key={`${inicio}-${fin}`}
            className="absolute z-30 pointer-events-none drop-shadow-xl flex flex-row items-center"
            style={{
              left: `${start.x}%`,
              top: `${start.y}%`,
              width: `${longitud}%`,
              height: altoSerpiente,
              transformOrigin: "0% 50%",
              transform: `translateY(-50%) rotate(${angulo}deg)${flipScale}`,
            }}
          >

            <div
              className="h-full flex-shrink-0 overflow-hidden"
              style={{ width: anchoCabeza }}
            >
              <img
                src="/serpiente_futuro_cabeza.png"
                alt="Cabeza"
                className="h-full max-w-none"
                style={{
                  width: "100%",
                  height: "50%",
                  transform:"translateY(46%) translateX(1%)"
                }}
              />
            </div>

            <div
              className="h-full flex-1"
              style={{
                backgroundImage: "url(/serpiente_futuro_cuerpo.png)",
                backgroundRepeat: "repeat-x",
                backgroundSize: patronCuerpo,
                backgroundPosition: "left center",
              }}
            />

            <div
              className="h-full flex-shrink-0 overflow-hidden"
              style={{ width: anchoCola }}
            >
              <img
                src="/serpiente_futuro_cola.png"
                alt="Cola"
                className="h-full max-w-none"
                style={{
                  width: "140%",
                  height: "113%",
                  transform: "translateX(-29%)translateY(-5%)",
                }}
              />
            </div>
          </div>
        );
      }
    });
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2 h-full max-h-full w-full mx-auto p-2 min-h-0 relative">
      {fichaSeleccionada && (
        <div className="absolute top-4 z-50 bg-black/80 px-6 py-2 rounded-full pointer-events-none shadow-lg border border-green-500/30">
          <p className="text-green-400 font-bold animate-pulse text-lg">
            Moviendo {fichaSeleccionada}. {valorDadoExterno !== null ? `Dado: ${valorDadoExterno}.` : ""} ¡Elige una casilla verde!
          </p>
        </div>
      )}

      {confirmacionEscalera && (
      <div className="absolute inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm rounded-2xl">
        <div className="bg-slate-800 border-2 border-yellow-500 p-6 rounded-2xl shadow-2xl flex flex-col items-center gap-4 animate-in zoom-in duration-300">
          <span className="text-4xl">🪜</span>
          <h3 className="text-white font-bold text-center">
            ¡Has caído en una escalera!<br/>
            <span className="text-yellow-400 text-sm italic">
              ¿Quieres subir a la casilla {confirmacionEscalera.casillaSalto}?
            </span>
          </h3>
          <div className="flex gap-4 w-full">
            <button onClick={() => { ejecutarMovimientoFinal(confirmacionEscalera.fichaId, confirmacionEscalera.casillaBase, confirmacionEscalera.casillaSalto); setConfirmacionEscalera(null); }} className="flex-1 py-2 bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg transition-colors shadow-lg"> SÍ, SUBIR </button>
            <button onClick={() => { ejecutarMovimientoFinal(confirmacionEscalera.fichaId, confirmacionEscalera.casillaBase, confirmacionEscalera.casillaBase); setConfirmacionEscalera(null); }} className="flex-1 py-2 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg transition-colors shadow-lg"> NO, QUEDARME </button>
          </div>
        </div>
      </div>
      )}

      <button onClick={enviarFichasACasa} className="absolute -top-10 left-40 z-50 px-4 py-1 bg-red-600 hover:bg-red-500 text-white font-bold rounded shadow transition-all">
        Reiniciar
      </button>

      <div className="h-full aspect-square max-w-full max-h-full bg-gray-900 p-1.5 rounded-2xl shadow-2xl shrink min-h-0 relative">
        <div className="w-full h-full grid grid-cols-10 grid-rows-10 relative overflow-hidden rounded-md">
          <div className="absolute inset-0 w-full h-full pointer-events-none z-30">
            {renderizarObstaculosPNG()}
          </div>
          {casillas.map((num) => {
            const fichasAqui = misFichas.filter(f => f.posicion === num);
            const datosCasilla = MOCK_BACKEND_DATA.casillas?.[num - 1];
            
            let imagenSrc = IMAGENES.VACIA;
            if (datosCasilla) {
              if (datosCasilla.tipo === "Meta") imagenSrc = IMAGENES.META;
              else if (datosCasilla.tipo === "Bifurcacion") imagenSrc = IMAGENES.BIFURCACION;
              else if (datosCasilla.esCurva) imagenSrc = IMAGENES.CURVA;
              else if (datosCasilla.tipo === "Vacía") imagenSrc = IMAGENES.VACIA;
              else imagenSrc = IMAGENES.NORMAL;
            }

            const rotacion = datosCasilla ? datosCasilla.rotacion : 0;
            const fichasAgrupadasPorEquipo = fichasAqui.reduce<Record<string, Ficha[]>>((grupos, ficha) => {
              if (!grupos[ficha.equipo]) grupos[ficha.equipo] = [];
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
              <div key={num} onClick={() => esDestinoPosible && moverFichaAlDestino(num)} className={`relative flex flex-wrap items-center justify-center gap-[2px] transition-all duration-300 ${esDestinoPosible ? "cursor-pointer ring-4 ring-green-300 ring-inset animate-pulse z-40 scale-105 shadow-[0_0_15px_rgba(34,197,94,0.8)]" : ""} ${!esDestinoPosible && fichaSeleccionada ? "opacity-30" : ""}`}>
                <div className="absolute inset-0 w-full h-full z-0 pointer-events-none scale-105" style={{ backgroundImage: `url(${imagenSrc})`, backgroundSize: '100% 100%', backgroundPosition: 'center', transform: `rotate(${rotacion}deg)` }} />
                <span className="absolute top-0.5 left-1 text-[8px] lg:text-[10px] font-bold text-white/50 z-10 pointer-events-none select-none">{num}</span>
                <div className={`relative z-20 grid place-items-center gap-[1px] ${fichasAqui.length === 1 ? "w-[82%] grid-cols-1" : fichasAqui.length === 2 ? "w-[112%] grid-cols-2" : "w-[100%] grid-cols-2"}`}>
                  {fichasVisibles.map(ficha => {
                    const esSeleccionable = (movimientosPermitidos[ficha.id]?.length ?? 0) > 0;
                    const estaSeleccionada = fichaSeleccionada === ficha.id;
                    const cantidadEquipoEnCasilla = fichasAgrupadasPorEquipo[ficha.equipo]?.length ?? 1;
                    const imagenFicha = ficha.equipo === "miEquipo"
                      ? "/Jugador_rojo_explorador.png"
                      : ficha.equipo === "equipoAzul"
                        ? "/Jugador_azul_explorador.png"
                        : ficha.equipo === "equipoVerde"
                          ? "/Jugador_verde_explorador.png"
                          : "/Jugador_amarillo_explorador.png";

                    const esDeTuEquipo = ficha.equipo === equipoActual;

                    return (
                      <div
                        key={ficha.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (fichaSeleccionada && esDestinoPosible) {
                            moverFichaAlDestino(num);
                            return;
                          }
                          seleccionarFicha(ficha.id);
                        }}
                        className={`w-full aspect-square bg-transparent relative flex items-center justify-center ${esSeleccionable && esDeTuEquipo ? "cursor-pointer ring-2 ring-yellow-400 ring-offset-1 ring-offset-transparent" : ""} ${estaSeleccionada ? "scale-110" : ""} ${fichasAqui.length === 1 ? "scale-[1.10]" : fichasAqui.length === 2 ? "scale-[1.08]" : ""}`} title={ficha.id}>
                        <img
                          src={imagenFicha}
                          alt={ficha.id}
                          className="block w-full h-full object-contain pointer-events-none select-none"
                          draggable={false}
                        />
                        {cantidadEquipoEnCasilla > 1 && ( <span className="absolute -top-1 -right-1 z-30 w-4 h-4 rounded-full bg-black/85 text-white text-[9px] font-bold flex items-center justify-center border border-white/60 pointer-events-none">{cantidadEquipoEnCasilla}</span> )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}