'use client';

import React, { useState } from 'react';

interface CajaCambiarNombreProps {
  nombreActual: string;
  onClose: () => void;
  onSave: (nuevoNombre: string) => Promise<void>;
}

export default function CajaCambiarNombre({ nombreActual, onClose, onSave }: CajaCambiarNombreProps) {
  const [nuevoNombre, setNuevoNombre] = useState(nombreActual);
  const [errorLocal, setErrorLocal] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  const handleGuardar = async () => {
    if (nuevoNombre.length > 10) {
      setErrorLocal('El nombre de usuario debe tener 10 caracteres o menos');
      return;
    }

    try {
      setEnviando(true);
      setErrorLocal(null);
      await onSave(nuevoNombre);
      onClose();
    } catch (err: any) {
      setErrorLocal(err.message);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-[#283F9F] border-4 border-amber-400 rounded-[2rem] p-8 w-full max-w-md shadow-2xl">
        <h2 className="text-white text-2xl font-bold mb-6 text-center uppercase tracking-tight">
          Cambiar Nombre
        </h2>

        <input
          type="text"
          value={nuevoNombre}
          onChange={(e) => setNuevoNombre(e.target.value)}
          maxLength={10}
          className="w-full bg-white/10 border-2 border-white/20 rounded-xl px-4 py-3 text-white text-xl outline-none focus:border-amber-400 transition-colors mb-2"
          placeholder="Nuevo nombre de usuario..."
          autoFocus
        />

        {errorLocal && <p className="text-red-400 text-sm font-bold mb-4 ml-2">⚠️ {errorLocal}</p>}

        <div className="flex gap-4 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white font-bold rounded-xl transition-colors"
          >
            CANCELAR
          </button>
          <button
            onClick={handleGuardar}
            disabled={enviando || nuevoNombre === nombreActual}
            className="flex-1 px-4 py-2 bg-amber-500 hover:bg-amber-400 disabled:bg-amber-800 disabled:opacity-50 text-[#283F9F] font-bold rounded-xl transition-all"
          >
            {enviando ? "GUARDANDO..." : "GUARDAR"}
          </button>
        </div>
      </div>
    </div>
  );
}