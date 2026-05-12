/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation"; // Importar esto
import { DisplayCarta } from "@/components/interfaz/DisplayCarta";
import ErrorMazo from "@/components/interfaz/ErrorMazo";
import ModalExito from "@/components/interfaz/ModalExito";
import { useEditorMazos } from "@/hooks/useEditorMazos";
import { useUser } from "@/context/userContext";

export default function EditorMazosPage() {
  const { userEmail } = useUser();
  const searchParams = useSearchParams();
  const deckId = searchParams.get("id"); // Capturamos el ID de la URL (?id=...)

  const {
    cartasDisponibles,
    cartasSeleccionadas,
    nombreMazo,
    setNombreMazo,
    limiteMazo,
    isLoading,
    isSaving,
    getCantidad,
    addCarta,
    removeCarta,
    guardarMazo,
    errorMazo,
    cerrarError,
    exitoGuardado
  } = useEditorMazos(userEmail || "", deckId || undefined);

  // Si no hay usuario cargado aún, no renderizamos para evitar errores de API
  if (!userEmail) return null;

  if (isLoading) {
    return (
      <main className="w-full h-full flex items-center justify-center bg-[#0a0f2c]">
        <div className="text-white text-2xl font-bold animate-pulse">
          Cargando catálogo de cartas...
        </div>
      </main>
    );
  }

  return (
    <main className="w-full h-full flex flex-col p-4 md:p-8 overflow-y-auto bg-[#0a0f2c] custom-scroll">

      {/* Modal de error (lleno, nombre vacío, etc) */}
      {errorMazo.abierto && (
        <ErrorMazo
          mensaje={errorMazo.mensaje}
          onClose={cerrarError}
        />
      )}

      {/* Modal de éxito al guardar mazo */}
      {exitoGuardado && (
        <ModalExito
          mensaje="Mazo guardado correctamente"
          onClose={() => { window.location.href = '/juego/mazos'; }}
        />
      )}

      {/* CABECERA: Título, Input y Contador */}
      <div className="flex flex-col items-center justify-center text-white shrink-0 mb-12 gap-4">
        <h1 className="text-4xl font-bold tracking-tight text-yellow-400">Editor de Mazos</h1>

        <input
          type="text"
          value={nombreMazo}
          onChange={(e) => setNombreMazo(e.target.value)}
          placeholder="Escribe el nombre de tu mazo..."
          maxLength={20}
          className="bg-transparent border-b-2 border-yellow-400 text-white text-center text-2xl outline-none p-2 placeholder-gray-500 focus:bg-white/5 transition-colors w-80"
        />

        <div className="text-xl mt-2 text-blue-300 bg-blue-900/40 px-6 py-2 rounded-full border border-blue-800 shadow-inner">
          Cartas en el mazo: <span className={cartasSeleccionadas.length === limiteMazo ? "text-yellow-400 font-bold" : "text-white font-bold"}>
            {cartasSeleccionadas.length} / {limiteMazo}
          </span>
        </div>
      </div>

      {/* SECCIÓN DE CARTAS SELECCIONADAS (Resumen rápido) */}
      {cartasSeleccionadas.length > 0 && (
        <div className="mb-10 p-4 bg-white/5 rounded-xl border border-white/10">
          <h2 className="text-white font-bold mb-4 uppercase text-sm tracking-widest text-center">Cartas en tu mazo (Haz click para quitar)</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {cartasSeleccionadas.map((carta, index) => (
              <div
                key={`selected-${index}`}
                onClick={() => removeCarta(carta.nombre)}
                className="cursor-pointer hover:scale-105 transition-transform"
              >
                <div className="w-20 h-28 bg-gray-800 border border-yellow-500/50 rounded flex items-center justify-center text-[10px] text-white text-center p-1 relative overflow-hidden">
                  <img src={carta.imagen} alt={carta.nombre} className="absolute inset-0 w-full h-full object-cover opacity-50" />
                  <span className="relative z-10 font-bold">{carta.nombre}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <hr className="border-white/10 mb-10" />

      {/* CATÁLOGO DE CARTAS (Todas las disponibles en el juego) */}
      <h2 className="text-white text-2xl font-bold mb-6 ml-10">Tu Colección</h2>

      <div className="flex flex-row flex-wrap gap-12 justify-center pb-32">
        {cartasDisponibles.map((carta, index) => {
          const cantidad = getCantidad(carta.nombre);
          return (
            <div
              key={index}
              onClick={() => addCarta(carta)}
              className="relative cursor-pointer group"
            >
              {/* Contador de copias de la misma carta en el mazo */}
              {cantidad > 0 && (
                <div className="absolute -top-3 -right-3 w-10 h-10 bg-yellow-500 text-black border-2 border-black rounded-full flex items-center justify-center font-bold z-20 shadow-lg">
                  x{cantidad}
                </div>
              )}

              <div className="group-hover:drop-shadow-[0_0_15px_rgba(250,204,21,0.5)] transition-all">
                <DisplayCarta carta={carta} />
              </div>

              {/* Overlay de "Click para añadir" */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-[1.5rem]">
                <span className="text-white font-bold bg-black/60 px-3 py-1 rounded-full border border-white/20">Añadir</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* BOTONERA FLOTANTE DE ACCIÓN */}
      <div className="fixed bottom-0 left-0 w-full p-6 bg-gradient-to-t from-[#0a0f2c] to-transparent flex justify-between items-center px-10">
        <Link
          href="/juego/mazos"
          className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-bold transition-colors"
        >
          Volver
        </Link>

        <button
          onClick={guardarMazo}
          disabled={isSaving || cartasSeleccionadas.length === 0}
          className={`
            flex items-center gap-3 px-12 py-4 rounded-xl font-sans font-bold text-xl shadow-2xl transition-all
            ${isSaving || cartasSeleccionadas.length === 0
              ? "bg-gray-600 cursor-not-allowed opacity-50"
              : "bg-yellow-500 hover:bg-yellow-400 text-black transform hover:-translate-y-1 active:scale-95"}
          `}
        >
          {isSaving ? (
            <>
              <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
              Guardando...
            </>
          ) : (
            "GUARDAR MAZO"
          )}
        </button>
      </div>
    </main>
  );
}