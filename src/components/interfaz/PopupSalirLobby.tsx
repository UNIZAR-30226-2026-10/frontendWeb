import React from 'react';

interface PopupSalirLobbyProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function PopupSalirLobby({ isOpen, onClose, onConfirm }: PopupSalirLobbyProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="bg-[#263c85] border-2 border-[#EFB810] rounded-xl p-6 md:p-8 max-w-sm w-full shadow-2xl text-center text-white">
        <h2 className="text-2xl font-bold mb-3">¿Abandonar sala?</h2>
        <p className="mb-8 text-gray-200">
          ¿Estás seguro de que quieres abandonar el lobby?
        </p>
        <div className="flex justify-center gap-4">
          <button 
            onClick={onClose}
            className="flex-1 bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded-lg transition-colors shadow-md"
          >
            No
          </button>
          <button 
            onClick={onConfirm}
            className="flex-1 bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-lg transition-colors shadow-md"
          >
            Sí, salir
          </button>
        </div>
      </div>
    </div>
  );
}