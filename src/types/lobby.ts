// Archivo en TypeScript que define las interfaces para el lobby del cliente.

export interface JugadorLobby {
    idJugador: string; /* Puede ser el email del usuario o uno para bots */
    nombre: string;
    esIA: boolean;
    nombreMazo?: string;
}

export interface Lobby {
    idLobby: string;
    idCreador: string;
    jugadores: JugadorLobby[];
    numJugadores: number;
    numBots: number;
}