import { TiendaUI, SeccionTienda } from '@/types/tienda';
import ItemTienda, { tipoSkin, CosmeticoAPI, TIPOS_COSMETICS } from '@/types/itemTienda';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

const SECCIONES_ORDEN = ['escalera', 'serpiente', 'icono', 'ficha'];

export const TiendaService = {
  getTienda: async (email: string): Promise<TiendaUI> => {
    try {
      const response = await fetch(`${API_URL}/cosmetics/store/${email}`, {
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error('Error al obtener la tienda o API no encontrada');
      }
      
      const cosmeticos: CosmeticoAPI[] = await response.json();
      
      // Agrupar cosméticos por tipo
      const cosmeticosPorTipo: Record<tipoSkin, ItemTienda[]> = {
        escalera: [],
        serpiente: [],
        icono: [],
        ficha: [],
      };

      cosmeticos.forEach(cosmetico => {
        // Detectar el tipo basado en el nombre del cosmético
        let tipo: tipoSkin = 'icono'; // tipo por defecto
        
        const nombreLower = cosmetico.nomCosmetico.toLowerCase();
        for (const [key, value] of Object.entries(TIPOS_COSMETICS)) {
          if (nombreLower.includes(key)) {
            tipo = value;
            break;
          }
        }

        cosmeticosPorTipo[tipo].push({
          nombre: cosmetico.nomCosmetico,
          tipo,
          precio: cosmetico.precio,
          imagen: `${cosmetico.nomCosmetico.toLowerCase().replace(/\s+/g, '_')}.png`,
          comprado: cosmetico.loTiene,
        });
      });

      // Crear secciones ordenadas
      const secciones: SeccionTienda[] = SECCIONES_ORDEN
        .map(tipo => ({
          nombre: tipo.charAt(0).toUpperCase() + tipo.slice(1),
          items: cosmeticosPorTipo[tipo as tipoSkin],
        }));

      return {
        sepDisponible: 0, // TODO: Obtener del perfil del usuario
        secciones,
      };
    } catch (error) {
      console.error('Failed to fetch store:', error);
      return {
        sepDisponible: 0,
        secciones: [],
      };
    }
  },

  comprarCosmetico: async (email: string, nombreCosmetico: string): Promise<void> => {
    try {
      const response = await fetch(`${API_URL}/cosmetics/store/${email}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cosmetic_name: nombreCosmetico,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al comprar el cosmético');
      }
    } catch (error) {
      console.error('Failed to purchase cosmetic:', error);
      throw error;
    }
  },
};
