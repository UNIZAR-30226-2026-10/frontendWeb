import SlotLogro from "@/components/interfaz/SlotLogro";

export default function Home() {
  return (
    <main className="w-full h-full flex flex-col p-4 md:p-8 overflow-y-auto">  
      <div className="flex items-center justify-center text-white text-3xl font-bold shrink-0 mb-8">  
        <h1> 
          Logros
        </h1>
      </div>

      <div className="flex flex-col gap-4">
        <SlotLogro 
          nombreLogro="Escalador Maestro"
          descripciónLogro="Gana 10 partidas"
          progresoLogro={100}
          metaLogro={100}
          recompensaLogro="Skin escalera"
        />
        <SlotLogro 
          nombreLogro="Mazo de 10 Cartas"
          descripciónLogro="Tener un mazo con 10 cartas"
          progresoLogro={9}
          metaLogro={10}
          recompensaLogro="200 Sep"
        />
      </div>
    </main>
  );
}