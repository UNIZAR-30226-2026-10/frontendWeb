  'use client';
  import { useState, useEffect } from 'react';
  import { MazoService } from '@/services/mazos.service';
  import { CardsService } from '@/services/cartas.service';
  import Carta from '@/types/carta';

  export const useEditorMazos = (email: string, deckId?: string) => {
    const [cartasDisponibles, setCartasDisponibles] = useState<Carta[]>([]);
    const [cartasSeleccionadas, setCartasSeleccionadas] = useState<Carta[]>([]);
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
          // 1. Cargamos todas las cartas disponibles en el juego
          const catalogo = await CardsService.getAllCards();
          setCartasDisponibles(catalogo);

          // 2. Si editamos, cargamos el mazo
          if (deckId) {
            const mazoAEditar = await MazoService.getMazoById(email, deckId);
            setNombreMazo(mazoAEditar.nombre);
            setCartasSeleccionadas(mazoAEditar.cartas);
          }
        } catch (err) {
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      };
      cargarDatos();
    }, [email, deckId]);

    const addCarta = (carta: Carta) => {
      const yaExiste = cartasSeleccionadas.some(c => c.nombre === carta.nombre);

      if (yaExiste) {
        setErrorMazo({ abierto: true, mensaje: '¡No puedes añadir la misma carta más de una vez!' });
        return;
      }

      if (cartasSeleccionadas.length < limiteMazo) {
        setCartasSeleccionadas([...cartasSeleccionadas, carta]);
      } else {
        setErrorMazo({ abierto: true, mensaje: '¡El mazo ya está lleno!' });
      }
    };

    const removeCarta = (nombre: string) => {
      const index = cartasSeleccionadas.findIndex(c => c.nombre === nombre);
      if (index > -1) {
        const nuevas = [...cartasSeleccionadas];
        nuevas.splice(index, 1);
        setCartasSeleccionadas(nuevas);
      }
    };

    const guardarMazo = async () => {
      if (cartasSeleccionadas.length != limiteMazo) {
        setErrorMazo({ abierto: true, mensaje: '¡El mazo debe estar lleno!' });
        return;
      }
      if (!nombreMazo.trim()) {
        setErrorMazo({ abierto: true, mensaje: 'Ponle un nombre al mazo' });
        return;
      }
  
      try {
        setIsSaving(true);
        if (deckId) {
          // Si tu back no tiene UPDATE, el service que hicimos lo borra y crea
          await MazoService.updateMazo(email, deckId, nombreMazo, cartasSeleccionadas);
        } else {
          await MazoService.createMazo(email, nombreMazo, cartasSeleccionadas);
        }
        alert("¡Mazo guardado con éxito!");
        window.location.href = "/juego/mazos"; // Redirección simple para asegurar limpieza de estado
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
      getCantidad: (nombre: string) => cartasSeleccionadas.filter(c => c.nombre === nombre).length,
      addCarta, removeCarta, guardarMazo,
      errorMazo, cerrarError: () => setErrorMazo({ ...errorMazo, abierto: false })
    };
  };