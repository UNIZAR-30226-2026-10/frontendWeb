import Carta from './carta'; 

export interface Mazo {
  id: string;
  deck_name: string;
  cards: Carta[];      // Sigue usando Carta, pero ahora viene del otro archivo
  is_in_use: boolean;
}