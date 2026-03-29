import { ListaJugadores } from "@/components/interfaz/ListaJugadores";
import { MazoVisual } from "@/components/interfaz/MazoPartida";
import Tablero from "@/components/interfaz/Tablero";
import { DadoPartida } from "@/components/interfaz/DadoPartida";

const jugadoresEjemplo = [
  { nombreJugador: "Ana", esTurno: true, esLider: true },
  { nombreJugador: "Luis", esTurno: false, esLider: false },
  { nombreJugador: "Marta", esTurno: false, esLider: false },
  { nombreJugador: "Diego", esTurno: false, esLider: false },
];

export default function Home() {
  return (
    <div className="w-full h-full flex flex-row p-4 md:p-4 gap-6 justify-between items-stretch bg-blue-700 min-h-0">
      
      {/* ================= COLUMNA IZQUIERDA ================= */}

      <div className="flex flex-col w-48 lg:w-52 shrink-0 h-full pb-0 pr-2 gap-2">

        <div className="flex-none pt-0">
          <ListaJugadores jugadores={jugadoresEjemplo} />
        </div>

        <div className="flex flex-col gap-1 min-h-0">
          <h2 className="text-white text-sm lg:text-base font-bold drop-shadow-md">Mano: (3/4)</h2>
          <div className="w-full relative">
             <MazoVisual />
          </div>
        </div>
      </div>

      {/* ================= COLUMNA CENTRAL (TABLERO REAL) ================= */}
      <div className="flex-1 flex items-center justify-center p-2 min-h-0 h-full">
        <div className="w-full h-full flex items-center justify-center max-h-[95vh]">
          <Tablero />
        </div>
      </div>

      {/* ================= COLUMNA DERECHA ================= */}
      <div className="flex flex-col justify-evenly items-center w-60 lg:w-64 shrink-0 h-full pb-4">

        <div className="bg-yellow-500 rounded-[2rem] p-4 w-full flex flex-col items-center shadow-lg border-b-8 border-yellow-600 shrink-0">
          <div className="w-20 h-20 bg-white rounded-full border-4 border-black mb-2 flex items-center justify-center shadow-inner">
            <span className="text-3xl">🐍</span>
          </div>
          <h2 className="text-white text-3xl font-bold drop-shadow-md">Tú</h2>
          <p className="text-white font-bold text-sm lg:text-base mt-1">
            <span className="underline">Mazo:</span> Lategame
          </p>
        </div>

        <div className="flex flex-col items-center gap-4 w-full shrink-0">
          <div className="text-center">
            <h2 className="text-white text-2xl lg:text-3xl font-bold drop-shadow-sm">Lanzar dado</h2>
            <p className="text-blue-200 text-xs lg:text-sm font-bold">*Terminará tu turno</p>
          </div>
          <DadoPartida />
        </div>

      </div>

    </div>
  );
}