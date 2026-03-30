'use client';

import { useEffect, useState } from 'react';
import { PerfilUI } from '@/types/perfil';
import { PerfilService } from '@/services/perfil.service';

export const usePerfil = (email: string) => {
  const [perfil, setPerfil] = useState<PerfilUI | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!email) return;

    const fetchPerfil = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const perfilData = await PerfilService.getPerfil(email);
        setPerfil(perfilData);
      } catch (err: any) {
        setError(err.message || 'Error al cargar el perfil');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPerfil();
  }, [email]);

  return {
    perfil,
    isLoading,
    error,
  };
};
