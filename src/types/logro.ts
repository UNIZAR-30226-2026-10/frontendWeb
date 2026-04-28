export type TipoLogro =
  | 'SEP'
  | 'ELO'
  | 'Partidas'
  | 'Victorias'
  | 'Derrotas'
  | 'CartasJugadas'
  | 'CartasColeccionadas'
  | 'LogrosDesbloqueados'
  | string;

export interface AchievementApi {
  nombre: string;          // Es tu ID en Prisma
  descripcion: string;
  requisito: number;
  tipo: TipoLogro;
  recompensaMonetaria?: number; // El campo que faltaba
  cartaID?: string;             // El ID de la carta de recompensa
}

export interface UserStatsApi {
  SEP?: number;
  victorias?: number;
  derrotas?: number;
  CartasJugadas?: number;    // Coincide con el backend
  PartidasJugadas?: number;  // Coincide con el backend
  NumeroAmigos?: number;
  CartasLegendarias?: number;
  LogrosCompletados?: string[];
}

export interface LogroUI {
  id: string;
  nombreLogro: string;
  descripcionLogro: string;
  progresoLogro: number;
  metaLogro: number;
  recompensaLogro: string;
  completado?: boolean;
}
