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

  const actualizarEquipamiento = async (itemAEquipar: Cosmetico) => {
    if (!perfil) return;
    try {
      const exito = await PerfilService.equiparCosmetico(email, {
        tipo: itemAEquipar.tipo,
        nombre: itemAEquipar.id
      });
      if (exito) {
      // ACTUALIZACIÓN OPTIMISTA
      if (itemAEquipar.tipo === 'Icono') {
        setPerfil({ ...perfil, fotoPerfil: itemAEquipar.id });
      } else {
        const nuevosEquipados = perfil.cosmeticos.map(c => 
          c.tipo === itemAEquipar.tipo ? itemAEquipar : c
        );
        setPerfil({ ...perfil, cosmeticos: nuevosEquipados });
      }
    }
    } catch {
      alert("No se pudo equipar el item en el servidor.");
    }
  };

  const actualizarUsername = async (nuevoNombre: string) => {
    if (!perfil || !nuevoNombre.trim()) return;
    if (nuevoNombre.length < 3) throw new Error("El nombre es demasiado corto");

    try {
      const exito = await PerfilService.cambiarUsername(email, nuevoNombre);
      if (exito) {
        // Actualización optimista del estado local
        setPerfil({ ...perfil, username: nuevoNombre });
      }
    } catch (err) {
      throw err; // Re-lanzamos para que el componente maneje el error
    }
  };
  const eliminarUser = async (email: string) => {
    try {
      const exito = await PerfilService.deleteUser(email);
      if (exito) {
        alert("Usuario eliminado exitosamente.");
      } else {
        alert("No se pudo eliminar el usuario.");
      }
    } catch (err) {
      alert("No se pudo eliminar el usuario.");
    }
  };

  useEffect(() => {
    if (email) fetchPerfil();
  }, [email, fetchPerfil]);

  return { perfil, isLoading, error, actualizarEquipamiento, actualizarUsername, eliminarUser, refresh: fetchPerfil };
};