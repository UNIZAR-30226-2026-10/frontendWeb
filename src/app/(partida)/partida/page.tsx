import { ListaJugadores } from "@/components/interfaz/ListaJugadores";
import { MazoVisual } from "@/components/interfaz/MazoPartida";
import { TableroFondo } from "@/components/interfaz/TableroFondo";
import { DadoPartida } from "@/components/interfaz/DadoPartida";

const jugadoresEjemplo = [
  { nombreJugador: "Ana", esTurno: true, esLider: true },
  { nombreJugador: "Luis", esTurno: false, esLider: false },
  { nombreJugador: "Marta", esTurno: false, esLider: false },
  { nombreJugador: "Diego", esTurno: false, esLider: false },
];

export default function Home() {
  return (
    <TableroFondo imagen="/tablero.jpg">
      <div className="relative flex h-full w-full flex-col gap-4 p-4">
        <ListaJugadores jugadores={jugadoresEjemplo} />
        <MazoVisual />
        <DadoPartida />
      </div>
      
    </TableroFondo>
  );
}