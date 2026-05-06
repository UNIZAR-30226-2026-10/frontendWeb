export interface Partida {
    ID: string;
    estado: 'EnEspera' | 'EnCurso' | 'Finalizada';
    SnapshotJugadores: snapshotJugadores; // Lista de usernames de los jugadores
    tablero: string; // Nombre del tablero seleccionado
    fechaCreacion: string; // ISO date string
    fechaFinalizacion?: string; // ISO date string, solo si estado es 'finalizada'
}
export type ChatMessage = {
    mandadoPor: string; // username del jugador que envió el mensaje
    mensaje: string;
}
export type ChatResponse = {
    chat: ChatMessage[];
}
export type usarCartaResponse = Partida;
export type movimientosResponse = {
    fichaId: number;
    casillaDestino:number;
    esBifurcacion: boolean;
    pasosRestantes?: number;
}
export type throwDiceResponse = {
    partida: Partida;
    tirada: number; // Resultado del dado
    movimientos: movimientosResponse[];
    tiradaExtra?: number; 
}
export type snapshotJugadores = {
    turnoActual: number; // Índice del jugador cuyo turno es actualmente
    ronda: number;
    jugadores: jugadorSchema[];
}
export type Ficha = {
  id: number;
  casilla: number;
  meta: boolean;
}
export type EfectoActivo = {
  resumenEfecto: string;
};
export type jugadorSchema = {
    username: string;
    fase: 'Cartas' | 'Movimiento';
    ultimaTirada?: number;
    fichas : Ficha[];
    mazo : string;
    mano : string[]; // Lista de nombres de cartas en mano
    mazoRestante: string[];
    cementerio : string[]; // Lista de nombres de cartas usadas
    cartaJugadaEnTurno: boolean;
    cartasJugadas: number;
    efectosActivos: EfectoActivo[]; // Lista de efectos activos sobre el jugador
    movimientosPermitidos:number[];
}
