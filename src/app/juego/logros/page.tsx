'use client';

import SlotLogro from '@/components/interfaz/SlotLogro';
import { useLogros } from '@/hooks/useLogros';

export default function Home() {
  const emailDelUsuario = 'admin@juego.com';
  const { logros, isLoading, error } = useLogros(emailDelUsuario);

  if (isLoading) {
    return <div className="text-white text-center mt-10 text-2xl w-full">Cargando logros...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-10 w-full">Error: {error}</div>;
  }

  return (
    <main className="w-full h-full flex flex-col p-4 md:p-8 overflow-y-auto">
      <div className="flex items-center justify-center text-white text-3xl font-bold shrink-0 mb-8">
        <h1>Logros ({logros.length})</h1>
      </div>

      <div className="flex flex-col gap-4">
        {logros.length === 0 ? (
          <p className="text-gray-400 mt-4 text-center text-lg">No hay logros disponibles.</p>
        ) : (
          logros.map((logro) => (
            <SlotLogro
              key={logro.id}
              nombreLogro={logro.nombreLogro}
              descripciónLogro={logro.descripcionLogro}
              progresoLogro={logro.progresoLogro}
              metaLogro={logro.metaLogro}
              recompensaLogro={logro.recompensaLogro}
            />
          ))
        )}
      </div>
    </main>
  );
}