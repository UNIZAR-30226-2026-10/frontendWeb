'use client';

import SlotLogro from '@/components/interfaz/SlotLogro';
import { useLogros } from '@/hooks/useLogros';
import { useUser } from '@/context/userContext'; 

export default function Home() {
  const { userEmail } = useUser(); 
  
  const { logros, isLoading, error, reclamar } = useLogros(userEmail || '');

  if (!userEmail) {
    return <div className="text-white text-center mt-10 text-2xl w-full font-bold">Por favor, inicia sesión para ver tus logros.</div>;
  }

  if (isLoading) {
    return <div className="text-white text-center mt-10 text-2xl w-full font-bold">Cargando logros...</div>;
  }

  if (error) {
    return (
      <main className="w-full h-full flex items-center justify-center">
        <div className="text-red-500 text-center text-xl font-bold uppercase">Error de la API: {error}</div>
      </main>
    );
  }

  return (
    <main className="w-full h-full flex flex-col p-4 md:p-8 overflow-y-auto ">
      <div className="flex items-center justify-center text-white text-3xl font-bold shrink-0 mb-8 ">
        <h1>Logros ({logros.length})</h1>
      </div>

      <div className="flex flex-col gap-4 ">
        {logros.length === 0 ? (
          <p className="text-gray-400 mt-4 text-center text-lg font-bold">No tienes logros disponibles o la lista está vacía.</p>
        ) : (
          logros.map((logro) => (
            <SlotLogro
              key={logro.id}
              nombreLogro={logro.nombreLogro}
              descripciónLogro={logro.descripcionLogro}
              progresoLogro={logro.progresoLogro}
              metaLogro={logro.metaLogro}
              recompensaLogro={logro.recompensaLogro}
              completado={logro.completado}
              onReclamar={() => reclamar(logro.id)}
            />
          ))
        )}
      </div>
    </main>
  );
}