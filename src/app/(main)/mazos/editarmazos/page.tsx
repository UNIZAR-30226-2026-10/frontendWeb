import Link from "next/dist/client/link";

{/*Falta implementar la lógica que modifique el mazo y al darle a guardar mande al back el mazo actualizado*/}
export default function Home() {
  return (
    <main>
      <div className="flex text-white items-center justify-center text-3xl">  
        <h1> 
          Editor de mazos 
        </h1>
      </div>
      <div className=" text-white text-3xl items-right justify-end flex mt-4 mr-10">
        <Link href="/mazos" className="mt-4 flex rounded-lg bg-gray-700 font-sans font-bold w-60 h-15 items-center justify-center hover:bg-gray-600 gap-4"> 
          Guardar
        </Link>
      </div>
      <h1 className="text-white text-3xl mt-4 ml-10"> Hay que terminar el componente DisplaayCarta</h1>
    </main>
  );
}