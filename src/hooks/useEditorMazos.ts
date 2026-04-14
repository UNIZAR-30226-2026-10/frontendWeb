'use client';
import { useState, useEffect } from 'react';
import { MazoService } from '@/services/mazos.service';
import { Carta } from '@/types/mazo';

export const useEditorMazos = (email: string, deckId?: string) => {
  const [cartasDisponibles, setCartasDisponibles] = useState<Carta[]>([]);
  const [cartasSeleccionadas, setCartasSeleccionadas] = useState<string[]>([]);
  const [nombreMazo, setNombreMazo] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMazo, setErrorMazo] = useState({ abierto: false, mensaje: '' });

  const limiteMazo = 10;

  // Cargar datos iniciales
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setIsLoading(true);
        // Aquí cargarías TODAS las cartas que existen en el juego (Catálogo)
        // const catalogo = await CardsService.getAllCards();
        // setCartasDisponibles(catalogo);

        // Si estamos editando uno existente, cargamos sus datos
        if (deckId) {
          const mazoAEditar = await MazoService.getMazoById(email, deckId);
          setNombreMazo(mazoAEditar.deck_name);
          setCartasSeleccionadas(mazoAEditar.cards);
        }
      } finally {
        setIsLoading(false);
      }
    };
    cargarDatos();
  }, [email, deckId]);

  const addCarta = (nombre: string) => {
    if (cartasSeleccionadas.length < limiteMazo) {
      setCartasSeleccionadas([...cartasSeleccionadas, nombre]);
    } else {
      setErrorMazo({ abierto: true, mensaje: '¡El mazo ya está lleno!' });
    }
  };

  const removeCarta = (nombre: string) => {
    const index = cartasSeleccionadas.indexOf(nombre);
    if (index > -1) {
      const nuevas = [...cartasSeleccionadas];
      nuevas.splice(index, 1);
      setCartasSeleccionadas(nuevas);
    }
  };

  const guardarMazo = async () => {
    if (!nombreMazo.trim()) {
      setErrorMazo({ abierto: true, mensaje: 'Ponle un nombre al mazo' });
      return;
    }
    
    try {
      setIsSaving(true);
      if (deckId) {
        await MazoService.updateMazo(email, deckId, nombreMazo, cartasSeleccionadas);
      } else {
        await MazoService.createMazo(email, nombreMazo, cartasSeleccionadas);
      }
      alert("¡Mazo guardado con éxito!");
    } catch (err) {
      setErrorMazo({ abierto: true, mensaje: 'Error al guardar' });
    } finally {
      setIsSaving(false);
    }
  };

  return {
    cartasDisponibles,
    cartasSeleccionadas,
    nombreMazo, setNombreMazo,
    limiteMazo,
    isLoading, isSaving,
    getCantidad: (nombre: string) => cartasSeleccionadas.filter(n => n === nombre).length,
    addCarta, removeCarta, guardarMazo,
    errorMazo, cerrarError: () => setErrorMazo({ ...errorMazo, abierto: false })
  };
};