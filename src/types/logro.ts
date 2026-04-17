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
  id?: string;
  nombre?: string;
  name?: string;
  descripcion?: string;
  description?: string;
  requisito?: number;
  requirement?: number;
  tipo?: TipoLogro;
  type?: TipoLogro;
  recompensa?: string;
  reward?: string;
  carta?: {
    nombre?: string;
    name?: string;
  } | null;
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
