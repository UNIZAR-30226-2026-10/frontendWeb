import { LogroUI, AchievementApi, UserStatsApi } from '@/types/logro';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const LogrosService = {
  // 1. Obtenemos las estadísticas del usuario
  getUserStats: async (email: string): Promise<UserStatsApi> => {
    const response = await fetch(`${API_URL}/users/${email}/stats`, { credentials: 'include' });
    if (!response.ok) throw new Error('Error al obtener estadísticas');
    return response.json();
  },

  // 2. Obtenemos todos los logros disponibles en el juego
  // Nota: Asumo que tienes esta ruta en api/achievements o similar
  getGlobalAchievements: async (): Promise<AchievementApi[]> => {
    const response = await fetch(`${API_URL}/achievements/all`); // Ajustar según tu ruta real
    if (!response.ok) return []; // Fallback si no existe la ruta aún
    return response.json();
  },

  // 3. Reclamar un logro (POST que tienes en userRoutes.js)
  reclamarLogro: async (email: string, achievementId: string): Promise<void> => {
    const response = await fetch(`${API_URL}/users/${email}/achievements`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ achievement_id: achievementId }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'No cumples los requisitos');
    }
  }
};