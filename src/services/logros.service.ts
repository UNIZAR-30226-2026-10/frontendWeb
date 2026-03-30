import { LogroUI } from '@/types/logro';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const LogrosService = {
  getLogros: async (email: string): Promise<LogroUI[]> => {
    // 1. Simulamos el tiempo de carga de internet (medio segundo)
    await new Promise(resolve => setTimeout(resolve, 500));

    // 2. Devolvemos unos datos de prueba (Mocks) para que puedas ver tu diseño
    return [
      {
        id: '1',
        nombreLogro: 'Escalador Maestro',
        descripcionLogro: 'Gana 10 partidas',
        progresoLogro: 10,
        metaLogro: 10,
        recompensaLogro: 'Skin escalera',
      },
      {
        id: '2',
        nombreLogro: 'Coleccionista de Cartas',
        descripcionLogro: 'Desbloquea 20 cartas',
        progresoLogro: 18,
        metaLogro: 20,
        recompensaLogro: '500 SEP',
      },
    ];

    /* --- GUARDA EL CÓDIGO REAL COMENTADO PARA EL FUTURO ---
    try {
      const response = await fetch(`${API_URL}/users/${email}/achievements`, {
        // credentials: 'include' 
      });
      
      if (!response.ok) {
        throw new Error('Error al obtener los logros o API no encontrada');
      }
      
      const data = await response.json();
      return data as LogroUI[];
    } catch (error) {
      console.error('Failed to fetch achievements:', error);
      return [];
    }
    -------------------------------------------------------- */
  },
};
