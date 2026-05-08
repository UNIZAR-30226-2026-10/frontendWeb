'use client';

import React from 'react';

interface ModalExitoProps {
  mensaje: string;
  onClose: () => void;
}

const ModalExito: React.FC<ModalExitoProps> = ({ mensaje, onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Fondo oscuro */}
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative bg-[#283F9F] border-4 border-green-400 rounded-3xl p-8 md:p-10 max-w-sm w-full shadow-2xl flex flex-col items-center gap-6 animate-in zoom-in-95 duration-200">
        {/* Icono de éxito */}
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30">
          <span className="text-white text-3xl">✓</span>
        </div>

        {/* Mensaje */}
        <p className="text-white text-xl font-bold text-center leading-snug">
          {mensaje}
        </p>

        {/* Botón OK */}
        <button
          onClick={onClose}
          className="w-full bg-green-500 hover:bg-green-400 text-white font-bold py-3 rounded-xl border-b-4 border-green-700 active:border-b-0 active:translate-y-1 transition-all text-lg uppercase shadow-lg"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default ModalExito;
