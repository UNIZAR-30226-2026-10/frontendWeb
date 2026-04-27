"use client";
import {useRouter} from 'next/navigation';

export const RegresarJuego = () => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-between w-full px-4 py-2 bg-[#283F9F] border-b-2 border-yellow-400 shadow-md">
      
      <button 
        className="flex items-center gap-2 text-white font-bold hover:text-yellow-300 transition-colors" 
        onClick={() => router.push('/juego')}
      >
        <span className="text-xl">←</span>
        Salir al Menu
      </button>
    </div>
  );
};