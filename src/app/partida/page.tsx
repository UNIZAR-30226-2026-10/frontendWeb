import { ListaJugadores } from "@/components/interfaz/ListaJugadores";
import { MazoVisual } from "@/components/interfaz/MazoPartida";
import Tablero from "@/components/interfaz/Tablero"; // 1. Descomentado e importado
import { DadoPartida } from "@/components/interfaz/DadoPartida";

const jugadoresEjemplo = [
  { nombreJugador: "Ana", esTurno: true, esLider: true },
  { nombreJugador: "Luis", esTurno: false, esLider: false },
  { nombreJugador: "Marta", esTurno: false, esLider: false },
  { nombreJugador: "Diego", esTurno: false, esLider: false },
];

export default function Home() {
  return (
    <div className="w-full h-full flex flex-row p-4 gap-6 justify-between items-stretch bg-blue-700">
      
      {/* ================= COLUMNA IZQUIERDA ================= */}
      <div className="flex flex-col w-64 lg:w-72 shrink-0 h-full overflow-y-auto pb-4 pr-2 custom-scrollbar">
        <div className="flex flex-col gap-2 pt-2">
          <ListaJugadores jugadores={jugadoresEjemplo} />
        </div>

        <div className="flex flex-col gap-2 mt-auto pt-6">
          <h2 className="text-white text-xl font-bold drop-shadow-md">Mano: (3/4)</h2>
          <div className="w-full relative">
             <MazoVisual />
          </div>
        </div>
      </div>

      {/* ================= COLUMNA CENTRAL (TABLERO REAL) ================= */}
      <div className="flex-1 flex items-center justify-center p-2">
        {/* Sustituimos el div del placeholder por el componente Tablero */}
        <Tablero />
      </div>

      {/* ================= COLUMNA DERECHA ================= */}
      <div className="flex flex-col justify-between items-center w-72 shrink-0 h-full">
        
        <div className="bg-yellow-500 rounded-[2rem] p-4 w-full flex flex-col items-center shadow-lg border-b-8 border-yellow-600 mt-8">
          <div className="w-24 h-24 bg-white rounded-full border-4 border-black mb-2 flex items-center justify-center shadow-inner">
            <span className="text-4xl">🐍</span>
          </div>
          <h2 className="text-white text-3xl font-bold drop-shadow-md">Tú</h2>
          <p className="text-white font-bold text-lg mt-2">
            <span className="underline">Mazo:</span> Lategame
          </p>
        </div>

        <div className="flex flex-col items-center gap-4 w-full">
          <div className="text-center">
            <h2 className="text-white text-2xl font-bold">Lanzar dado</h2>
            <p className="text-blue-200 text-xs font-bold">*Terminara tu turno</p>
          </div>
          
          <DadoPartida />

          <button className="bg-white text-red-600 font-bold text-2xl py-2 w-full rounded-full shadow-md border-b-4 border-gray-300 hover:translate-y-1 hover:border-b-0 transition-all mt-4">
            Rendirse
          </button>
        </div>

      </div>

    </div>
  );
}