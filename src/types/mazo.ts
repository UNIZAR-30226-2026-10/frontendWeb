// src/types/deck.ts

export interface CartaResumen {
  // Ajusta esto según lo que devuelva tu backend exactamente
  nombre: string;
}

export interface Deck {
  id: string; // El deck-id
  deck_name: string;
  cards: CartaResumen[] | string[]; 
  is_in_use?: boolean; // Para saber si lo está usando en partida
}