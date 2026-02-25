import Link from "next/link";
import { SlotMazo } from "../../components/interfaz/SlotMazo";

export default function Home() {
  return (
    <main>  
      <div className="flex flex-col text-2xl">
            <h1 className='text-white text-2xl text-center'>Mis mazos (2/8)</h1>       
            <div className="mt-4 flex rounded-lg bg-gray-700 font-sans font-bold w-60 h-15 items-center justify-center text-white hover:bg-gray-600 gap-4">  
              <h1 className="border-2 border-white rounded-full w-6 h-6 flex items-center justify-center">+</h1>  
              <Link href="/mazos/editarmazos" className="hover:underline">
                Nuevo Mazo
              </Link>
            </div>
      </div>
      <ul className="mt-4 flex flex-col ">
        <SlotMazo nombreMazo="Mazo 1" numMazos={2} previewCartas={["Carta 1", "Carta 2", "Carta 3"]} mazoEnUso={false}/>
        <SlotMazo nombreMazo="Mazo 2" numMazos={2} previewCartas={["Carta 1", "Carta 2", "Carta 3"]} mazoEnUso={true}/>
      </ul>
    </main>
  );
}