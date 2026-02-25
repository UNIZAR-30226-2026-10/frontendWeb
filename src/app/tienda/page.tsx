import DesplegableTienda from "@/components/interfaz/DesplegableTienda";
import SlotTienda from "@/components/interfaz/SlotTienda";
import React from 'react'
export default function Home() {
  return (
    <main>  
      <div className="flex text-white text-3xl">  
        <h1 className="text-center w-full"> 
          Tienda
        </h1>
        <h1 className ="text-right w-40 h-15 bg-gray-800 rounded-2xl items-center justify-center flex text-xl">
          Sep logo 200 
        </h1>
      </div>
      <div className="flex flex-col gap-4 p-4">
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