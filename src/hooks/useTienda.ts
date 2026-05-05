'use client';

import { useEffect, useState } from 'react';
import { TiendaUI } from '@/types/tienda';
import ItemTienda from '@/types/itemTienda';
import { TiendaService } from '@/services/tienda.service';

export const formatearNombreItem = (nombre: string): string => {
  // Convierte "ESCALERA_JUNGLA" a "Escalera Jungla"
  return nombre
    .split('_')
    .map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase())
    .join(' ');
};

export const useTienda = (email: string) => {
  const [tienda, setTienda] = useState<TiendaUI | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isComprando, setIsComprando] = useState(false);
  const [mensajeCompra, setMensajeCompra] = useState<{ tipo: 'exito' | 'error'; texto: string } | null>(null);

  const fetchTienda = async () => {
    if (!email) return;

    try {
      setIsLoading(true);
      setError(null);

      const tiendaData = await TiendaService.getTienda(email);
      setTienda(tiendaData);
    } catch (err: unknown) {
      setError((err as Error).message || 'Error al cargar la tienda');
    } finally {
      setIsLoading(false);
    }
  };

  const manejarCompra = async (item: ItemTienda): Promise<void> => {
    if (!email) {
      setMensajeCompra({ tipo: 'error', texto: 'Debes estar logueado para comprar' });
      return;
    }

    try {
      setIsComprando(true);
      setMensajeCompra(null);

      await TiendaService.comprarCosmetico(email, item.nombre);

      setMensajeCompra({ tipo: 'exito', texto: `¡${formatearNombreItem(item.nombre)} comprado exitosamente!` });

      // Refrescar la tienda después de 1.5 segundos
      setTimeout(() => {
        fetchTienda();
        setMensajeCompra(null);
      }, 1500);
    } catch (error) {
      const mensajeError = (error as Error).message || 'Error al comprar el cosmético';
      setMensajeCompra({ tipo: 'error', texto: mensajeError });
    } finally {
      setIsComprando(false);
    }
  };

  useEffect(() => {
    fetchTienda();
  }, [email]);

  return {
    tienda,
    isLoading,
    error,
    isComprando,
    mensajeCompra,
    setMensajeCompra,
    refetch: fetchTienda,
    manejarCompra,
  };
};
