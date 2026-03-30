import React from 'react';
import TarjetaAmigo from '../interfaz/TarjetaAmigo'; // Importamos el nuevo subcomponente

// Amigos Hardcodeados para probar
const sampleFriends = [
  { nombre: 'EscaladorMaestro', estado: 'online', avatar: '🐍' },
  { nombre: 'ZigZagKing', estado: 'invitado', avatar: '🐍' },
  { nombre: 'Colmillo Veloz', estado: 'online', avatar: '🐍' },
  { nombre: 'Escalera77', estado: 'desconectado', avatar: '🐍' },
];

const BarraAmigos = () => {
  return (
    <div className='flex flex-col bg-[#1a237e] h-screen w-80 shadow-2xl'>
      <div className="flex items-center justify-center gap-2 pt-6">
        <span className="text-white text-2xl">👤</span>
        <h1 className='text-3xl font-bold text-white'>Amigos</h1>
      </div>
      
      {/* Buscador temporal, se puede cambiar mas adelante */}
      <div className="px-4 mt-4">
        <div className="border-b border-gray-500 flex justify-between items-center pb-1">
          <div className="w-full h-1"></div>
          <span className="text-gray-400">🔍</span>
        </div>
      </div>
      {/* Lista de amigos, usando el componente TarjetaAmigo */}
      <div className='mt-4 flex flex-col gap-2 px-2'>
        {sampleFriends.map((friend, index) => (
          <TarjetaAmigo key={index} amigo={friend} />
        ))}
      </div>

      {/* Tuerca de ajustes al final */}
      <div className="mt-auto p-4 flex justify-end">
        <button className="text-gray-400 hover:text-white text-3xl">⚙️</button>
      </div>
    </div>
  );
};

export default BarraAmigos;