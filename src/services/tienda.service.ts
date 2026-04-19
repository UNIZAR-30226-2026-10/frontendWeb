import { TiendaUI } from '@/types/tienda';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://host.docker.internal:3000/api';

export const TiendaService = {
  getTienda: async (email: string): Promise<TiendaUI> => {
    // 1. Simulamos el tiempo de carga de internet (medio segundo)
    await new Promise(resolve => setTimeout(resolve, 500));

    // 2. Devolvemos unos datos de prueba (Mocks) para que puedas ver tu diseño
    return {
      sepDisponible: 200,
      secciones: [
        {
          nombre: 'Escaleras',
          items: [
            {
              nombre: 'Escalera de Oro',
              tipo: 'escalera',
              precio: 100,
              imagen: 'escalera.png',
              comprado: true,
            },
            {
              nombre: 'Escalera de Plata',
              tipo: 'escalera',
              precio: 150,
              imagen: 'escalera2.png',
              comprado: false,
            },
          ],
        },
        {
          nombre: 'Serpientes',
          items: [
            {
              nombre: 'Serpiente Real',
              tipo: 'serpiente',
              precio: 200,
              imagen: 'serpiente.png',
              comprado: true,
            },
            {
              nombre: 'Serpiente Venenosa',
              tipo: 'serpiente',
              precio: 300,
              imagen: 'serpiente2.png',
              comprado: false,
            },
          ],
        },
        {
          nombre: 'Iconos',
          items: [
            {
              nombre: 'Icono Especial',
              tipo: 'icono',
              precio: 100,
              imagen: 'icono.png',
              comprado: false,
            },
          ],
        },
        {
          nombre: 'Fichas',
          items: [
            {
              nombre: 'Ficha de Cristal',
              tipo: 'ficha',
              precio: 150,
              imagen: 'ficha.png',
              comprado: false,
            },
          ],
        },
      ],
    };

    /* --- GUARDA EL CÓDIGO REAL COMENTADO PARA EL FUTURO ---
    try {
      const response = await fetch(`${API_URL}/users/${email}/store`, {
        // credentials: 'include' 
      });
      
      if (!response.ok) {
        throw new Error('Error al obtener la tienda o API no encontrada');
      }
      
      const data = await response.json();
      return data as TiendaUI;
    } catch (error) {
      console.error('Failed to fetch store:', error);
      return {
        sepDisponible: 0,
        secciones: [],
      };
    }
    -------------------------------------------------------- */
  },
};
