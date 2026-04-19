'use client';

import React, { useState } from 'react';

interface DesplegableTiendaProps {
  nombreSeccion: string;
  children: React.ReactNode;
  estaAbiertoInicialmente?: boolean; 
}

const DesplegableTienda: React.FC<DesplegableTiendaProps> = ({ 
  nombreSeccion, 
  children, 
  estaAbiertoInicialmente = false 
}) => {
  const [isOpen, setIsOpen] = useState(estaAbiertoInicialmente);

  return (
    /* Borde dorado igual que los logros (border-amber-400 y border-2) */
    <div className="w-full border-2 border-amber-400 rounded-2xl overflow-hidden bg-black/10 shadow-lg mb-4">
      
      {/* Cabecera con el estilo de fuente de logros */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-[#283F9F] hover:bg-[#314bc2] transition-colors"
      >
        <span className="text-xl font-bold text-white uppercase tracking-wide">
          {nombreSeccion}
        </span>

        {/* Flecha idéntica a la de Amigos: ➔ con rotación de 90 grados */}
        <span 
          className={`text-white text-2xl transition-transform duration-200 p-1 leading-none
            ${isOpen ? 'rotate-90' : 'rotate-0'}`}
        >
          ➔
        </span>
      </button>

      {/* Contenido que se despliega */}
      <div 
        className={`transition-all duration-300 ease-in-out 
          ${isOpen ? 'max-h-[2000px] opacity-100 p-6' : 'max-h-0 opacity-0 overflow-hidden'}`}
      >
        {children}
      </div>
    </div>
  );
};

export default DesplegableTienda;