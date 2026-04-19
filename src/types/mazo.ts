export interface Carta {
  nombre: string;
  tipo: string;
  rareza: string;
  imagen: string;
  descripcion: string;
  efecto: string;
}

export interface Mazo {
  id: string;
  deck_name: string;
  cards: string[]; // Nombres de las cartas
  is_in_use: boolean;
}
