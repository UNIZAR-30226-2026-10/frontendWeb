"use client";

export const RegresarJuego = () => {
  return (
    <div className="flex items-center justify-between w-full p-4 bg-[#233EA0] border-b-2 border-yellow-400">
      <button className="flex items-center gap-2 text-white font-bold" onClick={() => window.history.back()}>
        <span className="p-1 rounded">←</span>
        Salir al Menu
      </button>
      <div className="text-gray-400">⚙️</div>
    </div>
  );
};