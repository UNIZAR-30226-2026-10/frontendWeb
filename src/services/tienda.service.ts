import { TiendaUI, SeccionTienda } from '@/types/tienda';
import ItemTienda, { tipoSkin, CosmeticoAPI } from '@/types/itemTienda';
import { LogrosService } from './logros.service'; // Reutilizamos para el SEP

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

const SECCIONES_ORDEN: tipoSkin[] = ['Skin_Escalera', 'Skin_Serpiente', 'Icono', 'Skin_Ficha'];

export const TiendaService = {
  getTienda: async (email: string): Promise<TiendaUI> => {
    try {
      // Lanzamos ambas peticiones en paralelo
      const [storeRes, statsRes] = await Promise.all([
        fetch(`${API_URL}/cosmetics/store/${email}`, { credentials: 'include' }),
        LogrosService.getUserStats(email) // Sacamos los SEP reales
      ]);
      
      if (!storeRes.ok) throw new Error('Error al obtener la tienda');
      
      const cosmeticos: CosmeticoAPI[] = await storeRes.json();
      
      const cosmeticosPorTipo: Record<tipoSkin, ItemTienda[]> = {
        'Skin_Escalera': [],
        'Skin_Serpiente': [],
        'Icono': [],
        'Skin_Ficha': [],
      };

      cosmeticos.forEach(cosmetico => {
        // Mejoramos la detección: si el nombre no ayuda, el back debería devolver el tipo
        // Por ahora, usamos tu lógica de detección por nombre
        let tipo: tipoSkin = 'Icono';
        const nombreLower = cosmetico.nomCosmetico.toLowerCase();
        
        if (nombreLower.includes('escalera')) tipo = 'Skin_Escalera';
        else if (nombreLower.includes('serpiente')) tipo = 'Skin_Serpiente';
        else if (nombreLower.includes('ficha')) tipo = 'Skin_Ficha';

        cosmeticosPorTipo[tipo].push({
          nombre: cosmetico.nomCosmetico,
          tipo,
          precio: cosmetico.precio,
          // Corregimos la ruta de imagen para que sea consistente
          imagen: `/${cosmetico.nomCosmetico.toLowerCase().replace(/\s+/g, '_')}.png`,
          comprado: cosmetico.loTiene,
        });
      });

      const secciones: SeccionTienda[] = SECCIONES_ORDEN.map(tipo => ({
        nombre: tipo.charAt(0).toUpperCase() + tipo.slice(1) + "s",
        items: cosmeticosPorTipo[tipo],
      }));

      return {
        sepDisponible: statsRes.SEP || 0, // ¡YA NO ES 0!
        secciones,
      };
    } catch (error) {
      console.error('Error cargando tienda:', error);
      throw error;
    }
  },

  comprarCosmetico: async (email: string, nombreCosmetico: string): Promise<void> => {
    const response = await fetch(`${API_URL}/cosmetics/store/${email}`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cosmetic_name: nombreCosmetico }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      // Captura mensajes como "No tienes suficientes SEP" del back
      throw new Error(errorData.message || 'Error en la compra');
    }
  },
};