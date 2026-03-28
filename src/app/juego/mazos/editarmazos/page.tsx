import Link from "next/link"; // Mejor usar next/link directo
import { DisplayCarta } from "@/components/interfaz/DisplayCarta";
import Carta from "@/types/carta";

{/*Falta implementar la lógica que modifique el mazo y al darle a guardar mande al back el mazo actualizado*/}

const cartasEjemplo: Carta[] = [
  { nombre: "Carta Común 1", tipo: "Bufo", rareza: "comun", imagen: "url1", descripcion: "Descripción de la carta común 1", efecto: "Efecto 1" },
  { nombre: "Carta Rara 1", tipo: "Debuff", rareza: "rara", imagen: "url2", descripcion: "Descripción de la carta rara 1", efecto: "Efecto 2" },
  { nombre: "Carta Épica 1", tipo: "Tablero", rareza: "epica", imagen: "url3", descripcion: "Descripción de la carta épica 1", efecto: "Efecto 3" },
  { nombre: "Carta Legendaria 1", tipo: "Bufo", rareza: "legendaria", imagen: "url4", descripcion: "Descripción de la carta legendaria 1", efecto: "Efecto 4" },
  { nombre: "Carta Común 2", tipo: "Tablero", rareza: "comun", imagen: "url5", descripcion: "Descripción de la carta común 2", efecto: "Efecto 5" },
  { nombre: "Carta Rara 2", tipo: "Bufo", rareza: "rara", imagen: "url6", descripcion: "Descripción de la carta rara 2", efecto: "Efecto 6" },
  { nombre: "Carta Épica 2", tipo: "Debuff", rareza: "epica", imagen: "url7", descripcion: "Descripción de la carta épica 2", efecto: "Efecto 7" },
  { nombre: "Carta Legendaria 2", tipo: "Bufo", rareza: "legendaria", imagen: "url8", descripcion: "Descripción de la carta legendaria 2", efecto: "Efecto 8" }
];

const limiteMazo = 10;

export default function Home() {
  return (
    <main className="w-full h-full flex flex-col p-4 md:p-8 overflow-y-auto">
      <div className="flex flex-col items-center justify-center text-white shrink-0 mb-8">
        <h1 className="text-3xl font-bold">
          Editor de mazos
        </h1>
        <div className="text-xl mt-2 text-gray-300">
          {cartasEjemplo.length}/{limiteMazo} cartas
        </div>
      </div>

      <div className="flex flex-row flex-wrap justify-center gap-8 md:gap-12 mb-8">
        {cartasEjemplo.map((carta, index) => (
          <DisplayCarta key={index} carta={carta} />
        ))}
      </div>

      <div className="flex justify-end w-full shrink-0 mt-auto pt-4">
        <Link 
          href="/juego/mazos" 
          className="flex rounded-lg bg-green-600 font-sans font-bold w-60 h-14 items-center justify-center text-white hover:bg-green-500 shadow-lg transition-colors text-xl"
        >
          Guardar Mazo
        </Link>
      </div>
    </main>
  );
}