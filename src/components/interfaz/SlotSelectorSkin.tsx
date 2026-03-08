import React from 'react';

interface SlotSelectorSkinProps {
  titulo: string;
  imagenPlaceholder: string;
}

const SlotSelectorSkin: React.FC<SlotSelectorSkinProps> = ({ titulo, imagenPlaceholder }) => {
  return (
    <div className="flex flex-col items-center">
      <h3 className="text-white font-bold text-lg mb-2">{titulo}</h3>
      {/* Caja para mostrar el cosmético equipado o un placeholder si no hay ninguno */}
      <div className="relative w-40 h-32 bg-white flex items-center justify-center rounded">
        {/* Placeholder para la imagen del cosmético */}
        <span className="text-gray-400 text-sm">{imagenPlaceholder}</span>
      </div>
    </div>
  );
};

export default SlotSelectorSkin;
