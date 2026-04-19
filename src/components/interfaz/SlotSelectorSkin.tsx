'use client';
import React from 'react';

// Definimos la interfaz exactamante como la usa el Perfil
interface SlotSelectorSkinProps {
  titulo: string;
  imagenPlaceholder: string; // El nombre de la skin que se verá en el cuadro blanco
  onClick: () => void;       // La función para abrir el selector
}

const SlotSelectorSkin: React.FC<SlotSelectorSkinProps> = ({ titulo, imagenPlaceholder, onClick }) => {
  return (
    <div 
      onClick={onClick} 
      className="flex flex-col items-center cursor-pointer group"
    >
      {/* Título original (h3) */}
      <h3 className="text-white font-bold text-lg mb-2">{titulo}</h3>
      
      {/* Caja blanca original w-40 h-32 */}
      <div className="relative w-40 h-32 bg-white flex items-center justify-center rounded shadow-lg transition-transform group-hover:scale-105 border-2 border-transparent group-hover:border-yellow-400">
        {/* Aquí se muestra el texto del cosmético equipado */}
        <span className="text-gray-400 text-sm font-bold text-center px-2">
          {imagenPlaceholder}
        </span>
      </div>
    </div>
  );
};

export default SlotSelectorSkin;