import { LogroUI, AchievementApi, UserStatsApi } from '@/types/logro';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const LogrosService = {
  getUserStats: async (email: string): Promise<UserStatsApi> => {
    const response = await fetch(`${API_URL}/users/${email}/stats`, { 
      credentials: 'include' // Imprescindible para el verifyToken
    });
    if (!response.ok) throw new Error('Error al obtener estadísticas');
    return response.json();
  },

  getGlobalAchievements: async (): Promise<AchievementApi[]> => {
    const response = await fetch(`${API_URL}/achievements`, { 
      credentials: 'include' 
    });
    if (!response.ok) return [];
    
    const data = await response.json();
    // Extraemos el array 'logros' del objeto { logros, cartaRecompensa }
    return data.logros || [];
  },

  reclamarLogro: async (email: string, achievementId: string): Promise<void> => {
    const response = await fetch(`${API_URL}/users/${email}/achievements`, {
      method: 'POST',
      credentials: 'include', // Imprescindible
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ achievement_id: achievementId }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'No cumples los requisitos');
    }
  }
};