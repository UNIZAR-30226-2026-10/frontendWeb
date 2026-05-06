export type Ficha = {
  id: number;
  casilla: number;
  meta: boolean;
};

export type EfectoActivo = {
  resumenEfecto: string;
};

export type JugadorEstado = {
  username: string;
  fase: 'Cartas' | 'Movimiento';
  ultimaTirada?: number;
  fichas: Ficha[];
  mazo: string;
  mano: string[];
  mazoRestante: string[];
  cementerio: string[];
  cartaJugadaEnTurno: boolean;
  cartasJugadas: number;
  efectosActivos: EfectoActivo[];
  movimientosPermitidos: number[];
};

export type SnapshotJugadores = {
  turnoActual: number;
  ronda: number;
  jugadores: JugadorEstado[];
};

export type CasillaTablero = {
  esCurva: boolean;
  rotacion: number;
  efecto?: string;
  tipo: 'Normal' | 'Escalera' | 'Serpiente' | 'Bifurcacion' | 'Meta' | 'Vacía';
  siguientes: number[];
  saltoA?: number;
};

export type SnapshotTablero = {
  casillas: CasillaTablero[];
};

export type ChatMessage = {
  mandadoPor: string;
  mensaje: string;
};

export type ConfiguracionPartida = {
  tablero: string;
  numeroJugadores: number;
  numeroBots: number;
};

export type PartidaJugador = {
  nombre: string;
  iconoActualField: string;
  fichaActualField: string;
  serpienteActualField: string;
  escaleraActualField: string;
};

export type Ganador = { nombre: string } | null;

export interface Partida {
  ID: string;
  estado: 'EnEspera' | 'EnCurso' | 'Finalizada';
  snapshotJugadores: SnapshotJugadores;
  fechaInicio: string;
  fechaFin: string | null;
  configuracion: ConfiguracionPartida;
  snapshotTablero: SnapshotTablero;
  chat: ChatMessage[];
  tableroInicialNombre: string;
  partidaJugadores: PartidaJugador[];
  ganador: Ganador;
}

export type ChatResponse = {
  chat: ChatMessage[];
};

export type usarCartaResponse = Partida;

export type movimientosResponse = {
  fichaId: number;
  casillaDestino: number;
  esBifurcacion: boolean;
  pasosRestantes?: number;
};

export type throwDiceResponse = {
  partida: Partida;
  tirada: number;
  movimientos: movimientosResponse[];
  tiradaExtra?: number;
};
