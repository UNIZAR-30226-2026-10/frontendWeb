"use client";

import Link from "next/dist/client/link";
import { DisplayCarta } from "@/components/interfaz/DisplayCarta";
import ErrorMazo from "@/components/interfaz/ErrorMazo";
import { useEditorMazos } from "@/hooks/useEditorMazos";
import Carta  from "@/types/carta";

export default function EditorMazosPage() {
  // Simulación: aquí pondrías el email del usuario logueado (desde Zustand o Context)
  const emailUsuario = "admin@juego.com"; 
  
  const {
    cartasDisponibles,
    cartasSeleccionadas,
    nombreMazo, setNombreMazo,
    limiteMazo = 10,
    isLoading, isSaving,
    getCantidad, addCarta, removeCarta, guardarMazo,
    errorMazo, cerrarError
  } = useEditorMazos(emailUsuario);

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

  return (
    <main className="w-full h-full flex flex-col p-4 md:p-8 overflow-y-auto bg-[#0a0f2c] custom-scroll">
      
      {errorMazo.abierto && (
        <ErrorMazo 
          mensaje={errorMazo.mensaje} 
          onClose={cerrarError} 
        />
      )}



      {/* CABECERA: Título, Input y Contador */}
      <div className="flex flex-col items-center justify-center text-white shrink-0 mb-12 gap-4">
        <h1 className="text-4xl font-bold tracking-tight">Editor de Mazos</h1>
        
        <input 
          type="text" 
          value={nombreMazo}
          onChange={(e) => setNombreMazo(e.target.value)}
          placeholder="Nombre del mazo..."
          maxLength={20}
          className="bg-transparent border-b-2 border-yellow-400 text-white text-center text-2xl outline-none p-2 placeholder-gray-500 focus:bg-white/5 transition-colors w-80"
        />

        <div className="text-xl mt-2 text-blue-300 bg-blue-900/40 px-6 py-2 rounded-full border border-blue-800">
          Cartas en el mazo: <span className={cartasSeleccionadas.length === limiteMazo ? "text-yellow-400 font-bold" : "text-white font-bold"}>
            {cartasSeleccionadas.length} / {limiteMazo}
          </span>
        </div>
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