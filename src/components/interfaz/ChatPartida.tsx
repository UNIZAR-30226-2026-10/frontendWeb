import React, { useEffect, useRef } from "react";
import { useChatPartida } from "@/hooks/useChat";

interface ChatPartidaProps {
  partidaId: string;
  username: string;
}

export function ChatPartida({ partidaId, username }: ChatPartidaProps) {
  const {
    chat,
    mensaje,
    setMensaje,
    enviarMensaje,
    enviandoMensaje
  } = useChatPartida({ partidaId, username, pollingMs: 2000 });

  const scrollRef = useRef<HTMLDivElement>(null);
  const isAtBottom = useRef<boolean>(true);

  const handleScroll = () => {
    const container = scrollRef.current;
    if (container) {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const alFinal = Math.abs(scrollHeight - scrollTop - clientHeight) < 30;
      isAtBottom.current = alFinal;
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      const ultimoMensajeEsMio = chat.length > 0 && chat[chat.length - 1].mandadoPor === username;
      if (isAtBottom.current || ultimoMensajeEsMio) {
        container.scrollTop = container.scrollHeight;
      }
    }
  }, [chat, username]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mensaje.trim() && !enviandoMensaje) {
      await enviarMensaje();
    }
  };

  return (
    <div className="flex flex-col w-full h-full bg-white/10 backdrop-blur-md border-2 border-yellow-500 rounded-xl overflow-hidden shadow-lg">
      {/* Header */}
      <div className="bg-yellow-500 text-white font-bold text-center py-1 text-sm border-b-2 border-yellow-600">
        Chat de Partida
      </div>
      
      {/* Messages */}
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto p-2 flex flex-col gap-2 min-h-0 text-sm scrollbar-thin scrollbar-thumb-yellow-500 scrollbar-track-transparent"
      >
        {chat.map((msg, index) => {
          const isMe = msg.mandadoPor === username;
          return (
            <div 
              key={index} 
              className={`flex flex-col max-w-[90%] ${isMe ? 'self-end items-end' : 'self-start items-start'}`}
            >
              {!isMe && <span className="text-yellow-300 text-[10px] font-bold ml-1">{msg.mandadoPor}</span>}
              <div 
                className={`px-2 py-1.5 rounded-lg break-words text-white shadow-sm ${
                  isMe 
                    ? 'bg-[#2078B4] rounded-br-none' 
                    : 'bg-white/20 rounded-bl-none'
                }`}
                style={{ wordBreak: 'break-word' }}
              >
                {msg.mensaje}
              </div>
            </div>
          );
        })}
        {chat.length === 0 && (
          <div className="text-white/50 text-center m-auto text-xs italic">
            No hay mensajes aún...
          </div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="flex p-1.5 gap-1.5 bg-black/20 border-t border-yellow-500/50">
        <input
          type="text"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          placeholder="Escribe algo..."
          className="flex-1 bg-white/10 text-white placeholder-white/50 border border-white/20 rounded-lg px-2 py-1.5 outline-none focus:border-yellow-500 transition-colors text-sm min-w-0"
          maxLength={150}
        />
        <button
          type="submit"
          disabled={!mensaje.trim() || enviandoMensaje}
          className="bg-yellow-500 hover:bg-yellow-400 disabled:opacity-50 disabled:hover:bg-yellow-500 text-white px-3 py-1.5 rounded-lg transition-colors flex items-center justify-center shrink-0 shadow-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path d="M3.478 2.404a.75.75 0 00-.926.941l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.404z" />
          </svg>
        </button>
      </form>
    </div>
  );
}
