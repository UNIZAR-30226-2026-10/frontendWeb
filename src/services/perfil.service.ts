import { PerfilUI } from '@/types/perfil';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://host.docker.internal:3000/api';

export const PerfilService = {
  getPerfil: async (email: string): Promise<PerfilUI> => {
    // --- SIMULACIÓN DE CARGA ---
    await new Promise(resolve => setTimeout(resolve, 600));

    // Datos Mock (lo que ves mientras no hay API)
    return {
      username: 'SerpienteGanadora5',
      sep: 250,
      victorias: 35,
      derrotas: 12,
      fotoPerfil: '/Icono Nerdge.jpg', 
      cosmeticos: [
        { id: '1', nombre: 'Ficha Default', tipo: 'Ficha' },
        { id: '2', nombre: 'Escalera Default', tipo: 'Escalera' },
        { id: '3', nombre: 'Serpiente Default', tipo: 'Serpiente' },
      ],
      todosMisCosmeticos: [
        { id: '1', nombre: 'Ficha Default', tipo: 'Ficha' },
        { id: 's2', nombre: 'Ficha Totem', tipo: 'Ficha' },
        { id: '2', nombre: 'Escalera Default', tipo: 'Escalera' },
        { id: 't2', nombre: 'Escalera de Hierro', tipo: 'Escalera' },
        { id: '3', nombre: 'Serpiente Default', tipo: 'Serpiente' },
        { id: 'm2', nombre: 'Serpiente Rica', tipo: 'Serpiente' },
      ],
    };

    /* --- CÓDIGO REAL PARA EL FUTURO ---
    const response = await fetch(`${API_URL}/users/${email}/profile`);
    if (!response.ok) throw new Error('Error al obtener el perfil');
    return await response.json();
    */
  },

  equiparCosmetico: async (email: string, cosmeticoId: string): Promise<boolean> => {
    // Simulación de guardado en DB
    console.log(`API: Guardando item ${cosmeticoId} para el usuario ${email}`);
    
    /* --- CÓDIGO REAL PARA EL FUTURO ---
    const response = await fetch(`${API_URL}/users/${email}/equip`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cosmeticoId })
    });
    return response.ok;
    */
    return true;
  }
};