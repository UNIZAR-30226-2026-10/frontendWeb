// src/hooks/useEditorMazos.ts
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

  const limiteMazo = 10;
  const maxCopiasPorCarta = 2; // Regla del juego: Máximo 2 iguales

  // Cargar las cartas al iniciar
  useEffect(() => {
    if (!email) return;
    CardsService.getUserCards(email)
      .then(setCartasDisponibles)
      .finally(() => setIsLoading(false));
  }, [email]);

  // Cuántas copias de esta carta hay en el mazo
  const getCantidad = (nombre: string) => cartasSeleccionadas.filter(c => c === nombre).length;

  // Añadir una copia (+)
  const addCarta = (nombre: string) => {
    const cantidadActual = getCantidad(nombre);

    if (cantidadActual >= maxCopiasPorCarta) return; // Ya tiene el máximo de esta carta
    
    if (cartasSeleccionadas.length >= limiteMazo) {
      alert(`¡El mazo ya tiene el máximo de ${limiteMazo} cartas!`);
      return;
    }
    
    setCartasSeleccionadas([...cartasSeleccionadas, nombre]);
  };

  // Quitar una copia (-)
  const removeCarta = (nombre: string) => {
    const index = cartasSeleccionadas.indexOf(nombre);
    if (index > -1) {
      const nuevasCartas = [...cartasSeleccionadas];
      nuevasCartas.splice(index, 1); // Quitamos solo la primera copia que encontremos
      setCartasSeleccionadas(nuevasCartas);
    }
  };

  // Guardar en el backend
  const guardarMazo = async () => {
    if (!nombreMazo.trim()) return alert('Por favor, ponle un nombre a tu mazo.');
    if (cartasSeleccionadas.length === 0) return alert('El mazo no puede estar vacío.');

    try {
      setIsSaving(true);
      await DecksService.createDeck(email, nombreMazo, cartasSeleccionadas);
      router.push('/juego/mazos'); // Volvemos a "Mis Mazos" al terminar
    } catch (err: any) {
      alert(err.message || 'Error al guardar el mazo');
    } finally {
      setIsSaving(false);
    }
  };

  return {
    cartasDisponibles, 
    cartasSeleccionadas,
    nombreMazo, 
    setNombreMazo,
    limiteMazo, 
    isLoading, 
    isSaving,
    getCantidad, 
    addCarta, 
    removeCarta, 
    guardarMazo
  };
};