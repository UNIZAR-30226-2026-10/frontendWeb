/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from 'react';
import Carta from '@/types/carta';
import { Ficha, JugadorEstado } from '@/types/partida';

// Cartas que necesitan seleccionar un jugador objetivo
const CARTAS_CON_OBJETIVO_JUGADOR = [
  "Mal de ojo",
  "Pickpocket",
  "Dado envenenado",
  "Noqueo",
  "Bolsillo roto",
];

// Cartas que necesitan seleccionar casillas inicio y fin
const CARTAS_CON_CASILLAS = [
  "Wild Frank",
  "Carpintero",
];

// Cartas que necesitan seleccionar una única casilla de destino
const CARTAS_CON_CASILLA_UNICA = [
  "Día de la marmota",
  "Dia de la marmota",
  "Agujero de serpiente",
  "Salto de longitud",
  "Serpiente en tu bota",
];

// Cartas que necesitan seleccionar una ficha propia (who = number)
const CARTAS_CON_FICHA = [
  "Robo de identidad",
];

interface ModalCartaProps {
  carta: Carta | null;
  onClose: () => void;
  onJugar: (carta: Carta, who?: string | number, inicio?: number, fin?: number) => void;
  esMiTurno: boolean;
  yaJugadoCarta: boolean;
  jugadores?: JugadorEstado[];
  fichasPropias?: Ficha[];
}

export const ModalCarta: React.FC<ModalCartaProps> = ({ 
  carta, 
  onClose, 
  onJugar, 
  esMiTurno, 
  yaJugadoCarta,
  jugadores = [],
  fichasPropias = [],
}) => {
  const [jugadorObjetivo, setJugadorObjetivo] = useState<string>("");
  const [casillaInicio, setCasillaInicio] = useState<string>("");
  const [casillaFin, setCasillaFin] = useState<string>("");
  const [fichaSeleccionada, setFichaSeleccionada] = useState<string>("");

  if (!carta) return null;

  const necesitaObjetivo = CARTAS_CON_OBJETIVO_JUGADOR.includes(carta.nombre);
  const necesitaCasillas = CARTAS_CON_CASILLAS.includes(carta.nombre);
  const necesitaCasillaUnica = CARTAS_CON_CASILLA_UNICA.includes(carta.nombre);
  const necesitaFicha = CARTAS_CON_FICHA.includes(carta.nombre);
  const fichasDisponibles = fichasPropias.filter((ficha) => !ficha.meta);

  const puedeJugar = esMiTurno && !yaJugadoCarta;

  const handleJugar = () => {
    if (necesitaObjetivo) {
      if (!jugadorObjetivo) {
        alert("Selecciona un jugador objetivo.");
        return;
      }
      onJugar(carta, jugadorObjetivo);
    } else if (necesitaCasillas) {
      const inicio = parseInt(casillaInicio) - 1;
      const fin = parseInt(casillaFin) - 1;
      if (isNaN(inicio) || isNaN(fin)) {
        alert("Introduce casillas válidas.");
        return;
      }
      onJugar(carta, undefined, inicio, fin);
    } else if (necesitaCasillaUnica) {
      const inicio = parseInt(casillaInicio) - 1;
      if (isNaN(inicio)) {
        alert("Introduce una casilla válida.");
        return;
      }
      onJugar(carta, undefined, inicio);
    } else if (necesitaFicha) {
      const fichaIndex = parseInt(fichaSeleccionada);
      if (isNaN(fichaIndex)) {
        alert("Selecciona una ficha.");
        return;
      }
      onJugar(carta, fichaIndex);
    } else {
      onJugar(carta);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative bg-slate-900 border-2 border-blue-500 p-5 rounded-3xl shadow-[0_0_50px_rgba(37,99,235,0.5)] max-w-[340px] w-full flex flex-col items-center gap-4 animate-in zoom-in-95 duration-200 z-10 max-h-[95vh] overflow-y-auto">
        
        <button onClick={onClose} className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors text-xl z-20">✕</button>

        <h2 className="shrink-0 text-xl font-black text-white uppercase tracking-widest border-b-2 border-blue-500 pb-1 w-full text-center mt-2">
          {carta.nombre}
        </h2>

        <div className="w-full flex-1 flex items-center justify-center min-h-0 overflow-hidden">
          <img src={carta.imagen} className="max-w-full max-h-[35vh] object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]" alt={carta.nombre} />
        </div>

        <div className="shrink-0 bg-blue-950/60 p-3 rounded-xl border border-blue-800/50 w-full">
          <p className="text-blue-100 text-center text-sm italic leading-tight">&quot;{carta.descripcion || carta.efecto}&quot;</p>
        </div>

        {/* Selección de objetivo: jugador */}
        {puedeJugar && necesitaObjetivo && jugadores.length > 0 && (
          <div className="w-full">
            <label className="text-white text-xs font-bold mb-1 block">Selecciona jugador objetivo:</label>
            <select
              value={jugadorObjetivo}
              onChange={(e) => setJugadorObjetivo(e.target.value)}
              className="w-full p-2 rounded-lg bg-slate-800 text-white border border-blue-600 text-sm"
            >
              <option value="">-- Elige jugador --</option>
              {jugadores.map((j) => (
                <option key={j.username} value={j.username}>{j.username}</option>
              ))}
            </select>
          </div>
        )}

        {/* Selección de casillas inicio/fin */}
        {puedeJugar && necesitaCasillas && (
          <div className="w-full flex gap-2">
            <div className="flex-1">
              <label className="text-white text-xs font-bold mb-1 block">Casilla inicio:</label>
              <input
                type="number"
                min={1}
                max={100}
                value={casillaInicio}
                onChange={(e) => setCasillaInicio(e.target.value)}
                className="w-full p-2 rounded-lg bg-slate-800 text-white border border-blue-600 text-sm"
                placeholder="1-100"
              />
            </div>
            <div className="flex-1">
              <label className="text-white text-xs font-bold mb-1 block">Casilla fin:</label>
              <input
                type="number"
                min={1}
                max={100}
                value={casillaFin}
                onChange={(e) => setCasillaFin(e.target.value)}
                className="w-full p-2 rounded-lg bg-slate-800 text-white border border-blue-600 text-sm"
                placeholder="1-100"
              />
            </div>
          </div>
        )}

        {/* Selección de casilla única */}
        {puedeJugar && necesitaCasillaUnica && (
          <div className="w-full">
            <label className="text-white text-xs font-bold mb-1 block">Selecciona la casilla objetivo:</label>
            <input
              type="number"
              min={1}
              max={100}
              value={casillaInicio}
              onChange={(e) => setCasillaInicio(e.target.value)}
              className="w-full p-2 rounded-lg bg-slate-800 text-white border border-blue-600 text-sm"
              placeholder="1-100"
            />
          </div>
        )}

        {/* Selección de ficha propia */}
        {puedeJugar && necesitaFicha && (
          <div className="w-full">
            <label className="text-white text-xs font-bold mb-1 block">Selecciona tu ficha:</label>
            <select
              value={fichaSeleccionada}
              onChange={(e) => setFichaSeleccionada(e.target.value)}
              className="w-full p-2 rounded-lg bg-slate-800 text-white border border-blue-600 text-sm"
              disabled={fichasDisponibles.length === 0}
            >
              <option value="">-- Elige ficha --</option>
              {fichasPropias.map((ficha, index) => {
                if (ficha.meta) return null;

                return (
                <option key={ficha.id} value={index}>
                  Ficha {ficha.id} - Casilla {ficha.casilla}
                </option>
                );
              })}
            </select>
            {fichasDisponibles.length === 0 && (
              <p className="mt-2 text-center text-xs text-yellow-300">
                No tienes fichas disponibles para esta carta.
              </p>
            )}
          </div>
        )}

        <div className="shrink-0 w-full">
          {puedeJugar ? (
            <button 
              onClick={handleJugar}
              className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-500 hover:to-emerald-400 text-white font-black rounded-2xl shadow-xl transition-all transform active:scale-95 uppercase tracking-wider text-sm"
            >
              Utilizar Carta
            </button>
          ) : (
            <div className="py-2 px-6 bg-red-500/10 border border-red-500/50 rounded-full text-center">
              <p className="text-red-400 font-bold text-xs uppercase italic tracking-wide">
                {!esMiTurno ? "No es tu turno" : "Ya has usado una carta este turno"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};