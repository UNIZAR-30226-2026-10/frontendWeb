// src/services/cards.service.ts
import Carta from '../types/carta';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
const imageSlug = (name: string): string => {
  return name
    .normalize('NFD')                    // separa letras de acentos
    .replace(/[\u0300-\u036f]/g, '')     // elimina tildes
    .replace(/ñ/g, 'n')
    .replace(/Ñ/g, 'n')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '_')                // espacios a _
    .replace(/[^a-z0-9_]/g, '');         // elimina caracteres raros
};


export const CardsService = {
  getAllCards: async (): Promise<Carta[]> => {
    const response = await fetch(`${API_URL}/cards`, { credentials: 'include' });
    if (!response.ok) throw new Error('Error al obtener catálogo');

    const data = await response.json();

    return data.cards.map((c: any) => ({
      nombre: c.nombre,
      tipo: c.tipo,
      calidad: c.calidad,
      descripcion: c.descripcion,
      imagen: `/Cartas/${imageSlug(c.nombre)}.png`,
      efecto: ""
    }));
  },

  /**
   * Obtiene las cartas que pertenecen específicamente al usuario (su colección).
   * Llama a GET /api/users/:email/cards en lugar del catálogo global.
   */
  getAllCardsByUser: async (email: string): Promise<Carta[]> => {
    const response = await fetch(
      `${API_URL}/users/${encodeURIComponent(email)}/cards`,
      { credentials: 'include' }
    );
    if (!response.ok) throw new Error('Error al obtener las cartas del usuario');

    const data = await response.json();

    return data.cards.map((c: any) => ({
      nombre: c.nombre,
      tipo: c.tipo,
      calidad: c.calidad,
      descripcion: c.descripcion,
      imagen: `/Cartas/${imageSlug(c.nombre)}.png`,
      efecto: ""
    }));
  }
};