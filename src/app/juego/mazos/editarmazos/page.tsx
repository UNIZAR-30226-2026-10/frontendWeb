import Link from "next/dist/client/link";
import { DisplayCarta } from "@/components/interfaz/DisplayCarta";
import Carta from "@/types/carta";

{/*Falta implementar la lógica que modifique el mazo y al darle a guardar mande al back el mazo actualizado*/}

const cartasEjemplo: Carta[] = [
  {
    nombre: "Carta Común 1",
    tipo: "Bufo",
    rareza: "comun",
    imagen: "url1",
    descripcion: "Descripción de la carta común 1",
    efecto: "Efecto 1"
  },
  {
    nombre: "Carta Rara 1",
    tipo: "Debuff",
    rareza: "rara",
    imagen: "url2",
    descripcion: "Descripción de la carta rara 1",
    efecto: "Efecto 2"
  },
  {
    nombre: "Carta Épica 1",
    tipo: "Tablero",
    rareza: "epica",
    imagen: "url3",
    descripcion: "Descripción de la carta épica 1",
    efecto: "Efecto 3"
  },
  {
    nombre: "Carta Legendaria 1",
    tipo: "Bufo",
    rareza: "legendaria",
    imagen: "url4",
    descripcion: "Descripción de la carta legendaria 1",
    efecto: "Efecto 4"
  },
  {
    nombre: "Carta Común 2",
    tipo: "Tablero",
    rareza: "comun",
    imagen: "url5",
    descripcion: "Descripción de la carta común 2",
    efecto: "Efecto 5"
  },
  {
    nombre: "Carta Rara 2",
    tipo: "Bufo",
    rareza: "rara",
    imagen: "url6",
    descripcion: "Descripción de la carta rara 2",
    efecto: "Efecto 6"
  },
  {
    nombre: "Carta Épica 2",
    tipo: "Debuff",
    rareza: "epica",
    imagen: "url7",
    descripcion: "Descripción de la carta épica 2",
    efecto: "Efecto 7"
  },
  {
    nombre: "Carta Legendaria 2",
    tipo: "Bufo",
    rareza: "legendaria",
    imagen: "url8",
    descripcion: "Descripción de la carta legendaria 2",
    efecto: "Efecto 8"
  }
];

const limiteMazo = 10;

export default function Home() {
  return (
    <main>
      <div className="flex text-white items-center justify-center text-3xl pt-4">
        <h1>
          Editor de mazos
        </h1>
      </div>
      <div className="text-white text-2xl mt-4 ml-10 text-center">
        {cartasEjemplo.length}/{limiteMazo}
      </div>
      <div className="flex flex-row flex-wrap gap-16 mt-4 ml-10">
        {cartasEjemplo.map((carta, index) => (
          <DisplayCarta key={index} carta={carta} />
        ))}
      </div>
      <div className=" text-white text-3xl items-right justify-end flex mt-4 mr-10">
        <Link href="/juego/mazos" className="mt-4 flex rounded-lg bg-gray-700 font-sans font-bold w-60 h-15 items-center justify-center hover:bg-gray-600 gap-4">
          Guardar
        </Link>
      </div>
    </main>
  );
}