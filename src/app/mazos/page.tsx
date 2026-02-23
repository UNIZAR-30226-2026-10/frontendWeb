import Link from "next/link";
export default function Home() {
  return (
    <main>  
      <h1 className="text-3xl text-center font-sans"> Mis mazos</h1>
      <Link href="/mazos/editarmazos" className="mt-4 flex rounded-lg bg-gray-700 font-sans font-bold w-60 h-15 items-center justify-center text-white hover:bg-gray-600 hover:underline">
        Nuevo Mazo
      </Link>
      <ul className="mt-4 flex flex-col ">
        <li className=" bg-gray-700 rounded-lg shadow-md p-4 mb-4">
          <h2 className="text-xl font-bold mb-2">Mazo 1</h2>
          <p className="text-gray-300">Descripción del mazo 1</p>
        </li>
        <li className=" bg-gray-700 rounded-lg shadow-md p-4 mb-4">
          <h2 className="text-xl font-bold mb-2">Mazo 2</h2>
          <p className="text-gray-300">Descripción del mazo 2</p>
        </li>
      </ul>
    </main>
  );
}