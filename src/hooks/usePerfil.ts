'use client';

import { useEffect, useState, useCallback } from 'react';
import { PerfilUI, Cosmetico } from '@/types/perfil';
import { PerfilService } from '@/services/perfil.service';

export const usePerfil = (email: string) => {
  const [perfil, setPerfil] = useState<PerfilUI | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPerfil = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await PerfilService.getPerfil(email);
      setPerfil(data);
    } catch (err: unknown) {
      setError((err as Error).message || 'Error al cargar el perfil');
    } finally {
      setIsLoading(false);
    }
  }, [email]);

  const actualizarEquipamiento = async (nuevoItem: Cosmetico) => {
    if (!perfil) return;
    try {
      const exito = await PerfilService.equiparCosmetico(email, nuevoItem.id);
      if (exito) {
        // Actualización optimista: cambiamos la UI antes de re-descargar
        const nuevosEquipados = perfil.cosmeticos.map(c => 
          c.tipo === nuevoItem.tipo ? nuevoItem : c
        );
        setPerfil({ ...perfil, cosmeticos: nuevosEquipados });
      }
    } catch (err) {
      alert("No se pudo equipar el item en el servidor.");
    }
  };

  useEffect(() => {
    if (email) fetchPerfil();
  }, [email, fetchPerfil]);

  return { perfil, isLoading, error, actualizarEquipamiento, refresh: fetchPerfil };
};