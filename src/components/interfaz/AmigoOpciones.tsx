const AmigoOpciones = () => {
  return (
    <div className="bg-[#0a0f2c] mt-1 rounded-md p-2 flex flex-col gap-2 border-l-4 border-blue-500 ml-2">
      <button className="flex items-center gap-2 text-white text-sm hover:bg-blue-900 p-2 rounded">
            <span>➕</span> Invitar a la partida
          </button>
          <button className="flex items-center gap-2 text-gray-500 text-sm cursor-not-allowed p-2">
            <span>➔</span> Unirse a la partida
          </button>
          <button className="flex items-center gap-2 text-white text-sm hover:bg-blue-900 p-2 rounded">
            <span>✉️</span> Enviar un mensaje
          </button>
          <button className="flex items-center gap-2 text-white text-sm hover:bg-red-900 p-2 rounded">
            <span>👤-</span> Borrar amigo
          </button>
    </div>
  );
};

export default AmigoOpciones;