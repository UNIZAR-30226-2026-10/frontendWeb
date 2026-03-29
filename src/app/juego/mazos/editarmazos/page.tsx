// src/app/juego/mazos/editarmazos/page.tsx
'use client';
import { DisplayCarta } from "@/components/interfaz/DisplayCarta";
import { useEditorMazos } from "@/hooks/useEditorMazos";

export default function EditorMazosPage() {
  // Simulación: aquí pondrías el email del usuario logueado (desde Zustand o Context)
  const emailUsuario = "admin@juego.com"; 
  
  const {
    cartasDisponibles,
    cartasSeleccionadas,
    nombreMazo, setNombreMazo,
    limiteMazo,
    isLoading, isSaving,
    getCantidad, addCarta, removeCarta, guardarMazo
  } = useEditorMazos(emailUsuario);

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center text-white text-2xl font-bold bg-[#0a0f2c]">
        Cargando tu colección de cartas...
      </div>
    );
  }

  return (
    <main className="w-full h-full flex flex-col p-4 md:p-8 overflow-y-auto bg-[#0a0f2c]">
      
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

      {/* CATÁLOGO DE CARTAS CON BOTONES + Y - */}
      <div className="flex flex-row flex-wrap justify-center gap-10 md:gap-14 mb-12">
        {cartasDisponibles.map((carta, index) => {
          const cantidad = getCantidad(carta.nombre);

          return (
            <div key={index} className="relative group">
              
              {/* Contenedor principal cliqueable para AÑADIR */}
              <div 
                onClick={() => addCarta(carta.nombre)} 
                className="cursor-pointer transition-transform group-active:scale-95"
              >
                <DisplayCarta 
                  carta={carta} 
                  cantidad={cantidad} 
                />
              </div>

              {/* Botón flotante para RESTAR (solo visible si ya tienes copias) */}
              {cantidad > 0 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Evita que se dispare el onClick de la carta entera
                    removeCarta(carta.nombre);
                  }}
                  className="absolute -top-4 -left-4 bg-red-600 hover:bg-red-500 text-white w-12 h-12 rounded-full border-2 border-white flex items-center justify-center font-bold text-4xl shadow-[0_0_15px_rgba(220,38,38,0.5)] z-30 active:scale-90 transition-transform pb-1.5"
                  title="Quitar una copia"
                >
                  -
                </button>
              )}

            </div>
          );
        })}
      </div>

      {/* BOTÓN DE GUARDAR */}
      <div className="flex justify-center w-full shrink-0 mt-auto pt-4 pb-8">
        <button 
          onClick={guardarMazo}
          disabled={isSaving}
          className={`flex rounded-xl font-sans font-bold w-72 h-16 items-center justify-center text-white shadow-lg transition-all text-2xl tracking-wide
            ${isSaving ? 'bg-gray-600 cursor-not-allowed' : 'bg-green-600 hover:bg-green-500 hover:shadow-green-900/50 active:scale-95'}`}
        >
          {isSaving ? 'GUARDANDO...' : 'GUARDAR MAZO'}
        </button>
      </div>

    </main>
  );
}