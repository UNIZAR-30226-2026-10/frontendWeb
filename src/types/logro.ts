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
  sep?: number;
  ELO?: number;
  elo?: number;
  partidasJugadas?: number;
  matchesPlayed?: number;
  victorias?: number;
  wins?: number;
  derrotas?: number;
  losses?: number;
  cartasJugadas?: number;
  cardsPlayed?: number;
  cartasColeccionadas?: number;
  cardsCollected?: number;
  logros?: Array<string | { nombre?: string; name?: string; id?: string }>;
  achievements?: Array<string | { nombre?: string; name?: string; id?: string }>;
  completedAchievements?: Array<string | { nombre?: string; name?: string; id?: string }>;
  completed_achievements?: Array<string | { nombre?: string; name?: string; id?: string }>;
}

export interface LogroUI {
  id: string;
  nombreLogro: string;
  descripcionLogro: string;
  progresoLogro: number;
  metaLogro: number;
  recompensaLogro: string;
}
