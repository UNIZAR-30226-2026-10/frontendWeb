// src/services/cards.service.ts
import Carta from '../types/carta';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const CardsService = {
  // Obtener el catálogo global de cartas
  getAllCards: async (): Promise<Carta[]> => {
    const response = await fetch(`${API_URL}/cards`, { credentials: 'include' });
    if (!response.ok) throw new Error('Error al obtener catálogo');
    const data = await response.json();
    
    // Mapeamos de 'calidad' (back) a 'rareza' (front)
    return data.cards.map((c: any) => ({
      nombre: c.nombre,
      tipo: c.tipo,
      rareza: c.calidad, // Ajuste de nombre
      descripcion: c.descripcion,
      imagen: `/Cartas/${c.nombre.replace(/\s+/g, '_').toLowerCase()}.png`,
      efecto: "" 
    }));
  }
};