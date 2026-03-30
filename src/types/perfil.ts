export interface Cosmetic {
  id: string;
  nombre: string;
  tipo: 'Escaleras' | 'Serpientes' | 'Fichas';
  imagen?: string;
}

export interface PerfilUI {
  username: string;
  sep: number;
  victorias: number;
  derrotas: number;
  fotoPerfil?: string;
  cosmeticos: Cosmetic[];
}
