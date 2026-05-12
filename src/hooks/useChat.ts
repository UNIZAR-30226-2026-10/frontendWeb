"use client";

import { useCallback, useEffect, useState } from "react";
import { MatchesService } from "../services/matches.service";
import { ChatMessage } from "../types/partida";

type UseChatPartidaParams = {
  partidaId?: string | null;
  username?: string | null;
  pollingMs?: number;
};

export function useChatPartida({
  partidaId,
  username,
  pollingMs = 7000,
}: UseChatPartidaParams) {
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [mensaje, setMensaje] = useState("");
  const [cargandoChat, setCargandoChat] = useState(false);
  const [enviandoMensaje, setEnviandoMensaje] = useState(false);
  const [errorChat, setErrorChat] = useState<string | null>(null);

  const cargarChat = useCallback(async () => {
    if (!partidaId || !username) return;

    try {
      setCargandoChat(true);
      setErrorChat(null);

      const data = await MatchesService.obtenerChatPartida(partidaId, username);
      setChat((prevChat) => {
        if (prevChat.length === data.chat.length) {
          return prevChat;
        }
        return data.chat;
      });
    } catch (error) {
      setErrorChat(
        error instanceof Error ? error.message : "Error al cargar el chat"
      );
    } finally {
      setCargandoChat(false);
    }
  }, [partidaId, username]);

  const enviarMensaje = useCallback(async () => {
    const texto = mensaje.trim();

    if (!texto || !partidaId || !username || enviandoMensaje) return;

    try {
      setEnviandoMensaje(true);
      setErrorChat(null);
      setMensaje("");

      const data = await MatchesService.enviarMensajeChat(
        partidaId,
        username,
        texto
      );

      setChat(data.chat);
    } catch (error) {
      setMensaje(texto);
      setErrorChat(
        error instanceof Error ? error.message : "Error al enviar el mensaje"
      );
    } finally {
      setEnviandoMensaje(false);
    }
  }, [mensaje, partidaId, username, enviandoMensaje]);

  useEffect(() => {
    if (!partidaId || !username) return;

    cargarChat();

    const intervalId = window.setInterval(() => {
      cargarChat();
    }, pollingMs);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [partidaId, username, pollingMs, cargarChat]);

  const limpiarErrorChat = useCallback(() => {
    setErrorChat(null);
  }, []);

  return {
    chat,
    setChat,

    mensaje,
    setMensaje,

    cargarChat,
    enviarMensaje,

    cargandoChat,
    enviandoMensaje,
    errorChat,
    limpiarErrorChat,
  };
}