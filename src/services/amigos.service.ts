import { Amigo } from '@/types/amigo';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://host.docker.internal:3000/api';

export const AmigosService = {
  getAmigos: async (email: string): Promise<Amigo[]> => {
    // 1. Simulamos el tiempo de carga de internet (medio segundo)
    await new Promise(resolve => setTimeout(resolve, 500));

    // 2. Devolvemos unos datos de prueba (Mocks) para que puedas ver tu diseño
    return [
      { id: '1', nombre: 'EscaladorMaestro', estado: 'online', avatar: '/Icono Cofre.jpg' },
      { id: '2', nombre: 'ZigZagKing', estado: 'invitado', avatar: '/icono L.jpg' },
      { id: '3', nombre: 'Colmillo Veloz', estado: 'online', avatar: '/Icono W.jpg' },
      { id: '4', nombre: 'Escalera77', estado: 'desconectado', avatar: '/Icono Nerdge.jpg       ' },
    ];

    /* --- GUARDA EL CÓDIGO REAL COMENTADO PARA EL FUTURO ---
    try {
      const response = await fetch(`${API_URL}/users/${email}/friends`, {
        // credentials: 'include' 
      });
      
      if (!response.ok) {
        throw new Error('Error al obtener los amigos o API no encontrada');
      }
      
      const data = await response.json();
      return data as Amigo[];
    } catch (error) {
      console.error('Failed to fetch friends:', error);
      return [];
    }
    -------------------------------------------------------- */
  },
};
