// src/services/cards.service.ts
import Carta from '../types/carta';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const CardsService = {
  getUserCards: async (email: string): Promise<Carta[]> => {
    // 1. Simulamos la carga
    await new Promise(resolve => setTimeout(resolve, 500));

    // 2. Mocks de prueba
    return [
      { nombre: "Carta Común 1", tipo: "Bufo", rareza: "comun", imagen: "url1", descripcion: "Aumenta +2 el ataque", efecto: "Efecto 1" },
      { nombre: "Carta Rara 1", tipo: "Debuff", rareza: "rara", imagen: "url2", descripcion: "Reduce -1 la defensa rival", efecto: "Efecto 2" },
      { nombre: "Carta Épica 1", tipo: "Tablero", rareza: "epica", imagen: "url3", descripcion: "Cambia el clima a tormenta", efecto: "Efecto 3" },
      { nombre: "Carta Legendaria 1", tipo: "Bufo", rareza: "legendaria", imagen: "url4", descripcion: "Revive a una unidad aliada", efecto: "Efecto 4" },
      { nombre: "Carta Común 2", tipo: "Tablero", rareza: "comun", imagen: "url5", descripcion: "Añade una trampa al tablero", efecto: "Efecto 5" },
    ];

    /* --- CÓDIGO REAL PARA EL FUTURO ---
    const response = await fetch(`${API_URL}/users/${email}/cards`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Error al obtener las cartas');
    return data as Carta[];
    */
  }
};