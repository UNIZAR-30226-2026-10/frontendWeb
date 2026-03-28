import DesplegableTienda from "@/components/interfaz/DesplegableTienda";
import SlotTienda from "@/components/interfaz/SlotTienda";
import React from 'react'

export default function Home() {
  return (
    <main className="w-full h-full flex flex-col p-4 md:p-8 overflow-y-auto">  
      <div className="relative flex items-center justify-center text-white text-3xl mb-8 shrink-0">  
        <h1 className="text-center font-bold"> 
          Tienda
        </h1>
        <div className="absolute right-0 w-40 h-16 bg-gray-800 rounded-2xl flex items-center justify-center text-xl shadow-md">
          <span>Sep logo 200</span>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <DesplegableTienda nombreSeccion="Escaleras" estaAbierto={false}>
          <SlotTienda 
            item={{
              nombre: "Escalera guapisima",
              tipo: "escalera",
              precio: 100,
              imagen: "escalera.png",
              comprado: false
            }}
          />
        </DesplegableTienda>

        <DesplegableTienda nombreSeccion="Serpientes" estaAbierto={false}>
          <SlotTienda 
            item={{
              nombre: "Serpiente guapisima",
              tipo: "serpiente",
              precio: 100,
              imagen: "serpiente.png",
              comprado: false
            }}
          />
          <SlotTienda
            item={{
              nombre: "Serpiente guapisima 2",
              tipo: "serpiente",
              precio: 1200,
              imagen: "serpiente2.png",
              comprado: false
            }}
          />
        </DesplegableTienda>

        <DesplegableTienda nombreSeccion="Iconos" estaAbierto={false}>
          <SlotTienda 
            item={{
              nombre: "Icono guapisimo",
              tipo: "icono",
              precio: 100,
              imagen: "icono.png",
              comprado: false
            }}
          />
        </DesplegableTienda>

        <DesplegableTienda nombreSeccion="Fichas" estaAbierto={false}>
          <SlotTienda 
            item={{
              nombre: "Ficha guapisima",
              tipo: "ficha",
              precio: 100,
              imagen: "ficha.png",
              comprado: false
            }}
          />
        </DesplegableTienda>
      </div>
    </main>
  );
}