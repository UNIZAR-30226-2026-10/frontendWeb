'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CardsService } from '@/services/cartas.service';
import { DecksService } from '@/services/mazos.service'; 
import Carta from '@/types/carta';

export const useEditorMazos = (email: string) => {
  const router = useRouter();
  const [cartasDisponibles, setCartasDisponibles] = useState<Carta[]>([]);
  const [cartasSeleccionadas, setCartasSeleccionadas] = useState<string[]>([]);
  const [nombreMazo, setNombreMazo] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMazo, setErrorMazo] = useState<{ abierto: boolean; mensaje: string }>({
    abierto: false,
    mensaje: ''
  });

  const limiteMazo = 10;
  const maxCopiasPorCarta = 2;

  useEffect(() => {
    if (!email) return;
    CardsService.getUserCards(email)
      .then(setCartasDisponibles)
      .finally(() => setIsLoading(false));
  }, [email]);

  const getCantidad = (nombre: string) => cartasSeleccionadas.filter(c => c === nombre).length;

  // Función para abrir el modal
  const lanzarError = (msj: string) => setErrorMazo({ abierto: true, mensaje: msj });
  // Función para cerrar el modal
  const cerrarError = () => setErrorMazo({ abierto: false, mensaje: '' });

  const addCarta = (nombre: string) => {
    const cantidadActual = getCantidad(nombre);
    if (cantidadActual >= maxCopiasPorCarta) return; 
    
    if (cartasSeleccionadas.length >= limiteMazo) {
      lanzarError(`¡El mazo ya tiene el máximo de ${limiteMazo} cartas!`); // Reemplazo de alert
      return;
    }
    setCartasSeleccionadas([...cartasSeleccionadas, nombre]);
  };

  const removeCarta = (nombre: string) => {
    const index = cartasSeleccionadas.indexOf(nombre);
    if (index > -1) {
      const nuevasCartas = [...cartasSeleccionadas];
      nuevasCartas.splice(index, 1);
      setCartasSeleccionadas(nuevasCartas);
    }
  };

  const guardarMazo = async () => {
    if (!nombreMazo.trim()) return lanzarError('Por favor, ponle un nombre a tu mazo.');
    if (cartasSeleccionadas.length === 0) return lanzarError('El mazo no puede estar vacío.');

    try {
      setIsSaving(true);
      await DecksService.createDeck(email, nombreMazo, cartasSeleccionadas);
      router.push('/juego/mazos');
    } catch (err: any) {
      lanzarError(err.message || 'Error al guardar el mazo');
    } finally {
      setIsSaving(false);
    }
  };

  return {
    cartasDisponibles, cartasSeleccionadas,
    nombreMazo, setNombreMazo,
    limiteMazo, isLoading, isSaving,
    getCantidad, addCarta, removeCarta, guardarMazo,
    errorMazo, cerrarError // 
  };
};