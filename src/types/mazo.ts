import { Carta } from './carta'; 

export interface Mazo {
  id: string;      // Lo mantenemos para el frontend
  nombre: string;  // Cambiado de 'deck_name' a 'nombre'
  cartas: Carta[]; // Cambiado de 'cards' a 'cartas'
  is_in_use: boolean;
}