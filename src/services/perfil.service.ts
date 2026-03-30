import { PerfilUI } from '@/types/perfil';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://host.docker.internal:3000/api';

export const PerfilService = {
  getPerfil: async (email: string): Promise<PerfilUI> => {
    // 1. Simulamos el tiempo de carga de internet (medio segundo)
    await new Promise(resolve => setTimeout(resolve, 500));

    // 2. Devolvemos unos datos de prueba (Mocks) para que puedas ver tu diseño
    return {
      username: 'SerpienteGanadora5',
      sep: 250,
      victorias: 35,
      derrotas: 12,
      fotoPerfil: '/Icono Nerdge.jpg',
      cosmeticos: [
        { id: '1', nombre: 'Escalera de Oro', tipo: 'Escaleras', imagen: '(Img Escalera)' },
        { id: '2', nombre: 'Serpiente Real', tipo: 'Serpientes', imagen: '(Img Serpiente)' },
        { id: '3', nombre: 'Fichas de Diamante', tipo: 'Fichas', imagen: '(Img Fichas)' },
      ],
    };

    /* --- GUARDA EL CÓDIGO REAL COMENTADO PARA EL FUTURO ---
    try {
      const response = await fetch(`${API_URL}/users/${email}/profile`, {
        // credentials: 'include' 
      });
      
      if (!response.ok) {
        throw new Error('Error al obtener el perfil o API no encontrada');
      }
      
      const data = await response.json();
      return data as PerfilUI;
    } catch (error) {
      console.error('Failed to fetch profile:', error);
      return {
        username: 'Usuario Desconocido',
        sep: 0,
        victorias: 0,
        derrotas: 0,
        cosmeticos: [],
      };
    }
    -------------------------------------------------------- */
  },
};
