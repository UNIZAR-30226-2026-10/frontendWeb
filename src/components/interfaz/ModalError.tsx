interface ModalErrorProps {
  mensaje: string;
  onClose: () => void;
}

export default function ModalError({ mensaje, onClose }: ModalErrorProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-[#121943] border-2 border-red-500 rounded-2xl p-8 max-w-sm w-full shadow-[0_0_30px_rgba(239,68,68,0.3)] flex flex-col items-center gap-6 animate-in fade-in zoom-in duration-200">
        <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center border-2 border-red-500">
          <span className="text-red-500 text-4xl font-bold">!</span>
        </div>
        
        <p className="text-white text-center text-xl font-medium">
          {mensaje}
        </p>

        <button
          onClick={onClose}
          className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3 rounded-xl transition-colors shadow-lg active:scale-95"
        >
          Aceptar
        </button>
      </div>
    </div>
  );
}
