"use client";
import React, { useState, useRef, useEffect } from "react";

interface SelectorMazoProps {
  mazoSeleccionado: string;
  onMazoSeleccionado: (mazo: string) => void;
  mazosDisponibles: string[];
  isLoading?: boolean;
}

const SelectorMazo: React.FC<SelectorMazoProps> = ({
  mazoSeleccionado,
  onMazoSeleccionado,
  mazosDisponibles,
  isLoading = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const mazos = mazosDisponibles;
  const hayMazos = mazos.length > 0;

  // Cerrar al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={menuRef}>
      {/* BOTÓN PRINCIPAL */}
      <button
        onClick={() => {
          if (!hayMazos || isLoading) return;
          setIsOpen(!isOpen);
        }}
        disabled={!hayMazos || isLoading}
        className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border-2 transition-all shadow-md
          ${isOpen ? "border-white bg-[#283F9F]" : "border-yellow-400 bg-[#283F9F] hover:bg-[#283593]"}
          ${(!hayMazos || isLoading) ? "opacity-70 cursor-not-allowed" : ""}`}
      >
        <span className="text-white font-bold">
          {isLoading ? 'Cargando mazos...' : (hayMazos ? mazoSeleccionado : 'Sin mazos disponibles')}
        </span>
        <span 
          className={`text-white transition-transform duration-200 p-1 text-xl leading-none
            ${isOpen ? 'rotate-90' : 'rotate-0'}`}
        >
          ➔
        </span>
      </button>

      {/* LISTA DESPLEGABLE */}
      {isOpen && hayMazos && (
        <div className="absolute top-full left-0 w-full mt-1 bg-[#283F9F] border-2 border-yellow-400 rounded-lg overflow-hidden z-[100] shadow-2xl animate-in slide-in-from-top-2 duration-150">
          {mazos.map((mazo) => (
            <button
              key={mazo}
              className={`w-full text-left px-4 py-3 text-white font-semibold transition-colors
                ${mazo === mazoSeleccionado 
                  ? "bg-yellow-400 text-[#283F9F]" 
                  : "hover:bg-[#283593] border-b border-white/10 last:border-0"}`}
              onClick={() => {
                onMazoSeleccionado(mazo);
                setIsOpen(false);
              }}
            >
              {mazo}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectorMazo;