export interface Cosmetico {
  id: string;
  nombre: string;
  tipo: 'Ficha' | 'Escalera' | 'Serpiente' | 'Icono';
  imagen?: string;
}

export interface PerfilUI {
  username: string;
  sep: number;
  fotoPerfil: string;
  victorias: number;
  derrotas: number;
  cosmeticos: Cosmetico[]; // Los equipados
  todosMisCosmeticos: Cosmetico[]; // El inventario completo
}