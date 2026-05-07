export interface Jugador {
  nombre: string;
  esIA: boolean;
  estaListo: boolean;
  nombreMazo?: string;
  icono?: string;
}

export interface Lobby {
  idLobby: string;
  idCreador: string;
  jugadores: Jugador[];
  numJugadores: number;
  numBots: number;
  tablero: string;
  idPartida?: string;
}
