// src/components/interfaz/BorrarMazoConfirmar.tsx
'use client';
import React from 'react';

interface Props {
  isOpen: boolean;
  nombreMazo: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const BorrarMazoConfirmar: React.FC<Props> = ({ isOpen, nombreMazo, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Fondo oscuro con desenfoque */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onCancel} />

      {/* Caja del Modal */}
      <div className="relative bg-[#283F9F] border-4 border-amber-400 rounded-[2.5rem] p-8 shadow-2xl max-w-lg w-full animate-in zoom-in-95 duration-200">
        
        <h2 className="text-white text-3xl font-bold uppercase mb-6 text-center tracking-tighter">
          ¿Confirmar borrado?
        </h2>
        
        <p className="text-gray-200 text-center mb-10 text-xl font-medium leading-relaxed">
          ¿Estás seguro que quieres borrar el mazo: <br />
          <span className="text-amber-400 font-black text-2xl">&quot;{nombreMazo}&quot;</span>?
        </p>

        <div className="flex gap-4">
          <button
            onClick={onCancel}
            className="flex-1 bg-gray-600 hover:bg-gray-500 text-white font-bold py-4 rounded-2xl transition-all uppercase tracking-widest text-sm"
          >
            Volver
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-red-600 hover:bg-red-500 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-red-900/40 uppercase tracking-widest text-sm"
          >
            Sí, borrar
          </button>
        </div>
      </div>
    </div>
  );
};