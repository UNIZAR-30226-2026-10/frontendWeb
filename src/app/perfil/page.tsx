import React from 'react';
import SlotSelectorSkin from '@/components/interfaz/SlotSelectorSkin';


export default function Perfil() {
  return (
    <main className="p-4 w-full h-full flex flex-col text-white">
      <div className="flex justify-center mb-6">
        <h1 className="text-3xl font-bold">Perfil</h1>
      </div>

      <div className="relative bg-gray-800 border-2 border-yellow-400 rounded-4xl p-8 shadow-xl flex flex-col gap-8 max-w-5xl mx-auto w-full">
        
        <div className="absolute top-6 right-8 text-2xl font-bold text-white">
          35W/12L
        </div>

        <div className="flex flex-row items-center gap-8 mt-4">
          
          <div className="relative">
            <div className="w-40 h-40 bg-white rounded-full border-black flex items-center justify-center overflow-hidden">
              {/*Icono del perfil, donde iria la imagen */}
              <div className="text-green-600 text-6xl font-bold">Icono</div>
            </div>
          </div>

          <div className="flex flex-col gap-6 w-full max-w-md">
            <div className="flex items-center gap-4">
              <span className="font-bold text-xl underline">
                Nombre de usuario:
              </span>
              <div className="flex items-center justify-between bg-transparent border border-white rounded px-4 py-1 flex-grow cursor-pointer hover:bg-white/10 transition-colors">
                <span className="text-lg">SerpienteGanadora5</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-serif text-3xl text-gray-300 ">Sep</span>
              <span className="text-4xl font-bold text-white">200</span>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <h2 className="text-2xl font-bold mb-6 text-white">Cosmeticos:</h2>
          
          <div className="flex flex-row flex-wrap justify-around gap-6">
            <SlotSelectorSkin 
              titulo="Escaleras" 
              imagenPlaceholder="(Img Escalera)" 
            />
            <SlotSelectorSkin 
              titulo="Serpientes" 
              imagenPlaceholder="(Img Serpiente)" 
            />
            <SlotSelectorSkin 
              titulo="Fichas" 
              imagenPlaceholder="(Img Fichas)" 
            />
          </div>
        </div>

      </div>
    </main>
  );
}