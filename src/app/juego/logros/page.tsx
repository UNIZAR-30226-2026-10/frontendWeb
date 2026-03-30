import SlotLogro from "@/components/interfaz/SlotLogro";

export default function Home() {
  return (
    <main>  
      <div className="flex text-white items-center justify-center text-3xl">  
        <h1> 
          Logros
        </h1>
      </div>
      <div className="flex flex-col justify-right gap-4 p-4">
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