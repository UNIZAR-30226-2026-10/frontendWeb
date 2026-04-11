// src/services/cards.service.ts
import Carta from '../types/carta';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const CardsService = {
  getUserCards: async (email: string): Promise<Carta[]> => {
    // 1. Simulamos la carga
    await new Promise(resolve => setTimeout(resolve, 500));

    // 2. Mocks de prueba
    return [
      { nombre: "Exceso de medios", tipo: "Bufo", rareza: "comun", imagen: "/Cartas/exceso-de-medios.png", descripcion: "Tiras 2 dados", efecto: "Efecto 1" },
      { nombre: "Moises", tipo: "Debuff", rareza: "rara", imagen: "/Cartas/moises.png", descripcion: "Te saltas un bloqueo", efecto: "Efecto 2" },
      { nombre: "Wild Frank", tipo: "Tablero", rareza: "epica", imagen: "/Cartas/wild-frank.png", descripcion: "Pones una serpiente donde quieras", efecto: "Efecto 3" },
      { nombre: "Carpintero", tipo: "Bufo", rareza: "legendaria", imagen: "/Cartas/carpintero.png", descripcion: "Pones una escalera donde quieras", efecto: "Efecto 4" },
      { nombre: "Dia de la marmota", tipo: "Tablero", rareza: "comun", imagen: "/Cartas/dia-de-la-marmota.png", descripcion: "Cambias la casilla para que quien caiga se mueva 4 casillas atrás", efecto: "Efecto 5" },
      { nombre: "Salto de longitud", tipo: "Debuff", rareza: "comun", imagen: "/Cartas/salto-de-longitud.png", descripcion: "Cambias la casilla para que quien caiga se mueva 4 casillas adelante", efecto: "Efecto 6" },
      { nombre: "Robo de identidad", tipo: "Tablero", rareza: "rara", imagen: "/Cartas/robo-de-identidad.png", descripcion: "Cambias una casilla para que al caer te lleve a la posición de otra al azar", efecto: "Efecto 7" },
      { nombre: "Mal de ojo", tipo: "Debuff", rareza: "epica", imagen: "/Cartas/mal-de-ojo.png", descripcion: "Le restas a un jugador 3 en su próxima tirada", efecto: "Efecto 8" },
      { nombre: "Antidoto", tipo: "Bufo", rareza: "comun", imagen: "/Cartas/antidoto.png", descripcion: "La próxima serpiente en la que caigas no te hará bajar", efecto: "Efecto 9" },
      { nombre: "Pickpocket", tipo: "Debuff", rareza: "rara", imagen: "/Cartas/pickpocket.png", descripcion: "Robas una carta al azar a otro jugador", efecto: "Efecto 10" },
      { nombre: "Dado envenenado", tipo: "Debuff", rareza: "epica", imagen: "/Cartas/dado-envenenado.png", descripcion: "El rival solo puede tirar dados de 1-3 en su próximo turno", efecto: "Efecto 11" },
      { nombre: "Dado dorado", tipo: "Bufo", rareza: "legendaria", imagen: "/Cartas/dado-dorado.png", descripcion: "Puedes tirar dados de 4-6 en tu próximo turno", efecto: "Efecto 12" },
      { nombre: "Serpiente en tu bota", tipo: "Tablero", rareza: "comun", imagen: "/Cartas/serpiente-en-tu-bota.png", descripcion: "Creas una casilla que hace perder un turno al caer en ella", efecto: "Efecto 13" },
      { nombre: "Parca", tipo: "Debuff", rareza: "rara", imagen: "/Cartas/parca.png", descripcion: "Mandas una ficha al azar al inicio del tablero", efecto: "Efecto 14" },
      { nombre: 'Cambiar de idea', tipo: 'Bufo', rareza: 'epica', imagen: '/Cartas/cambiar-de-idea.png', descripcion: 'Puedes volver a tirar tus cartas en tu próximo turno', efecto: 'Efecto 15' },
      { nombre: 'Agujero de serpiente', tipo: 'Tablero', rareza: 'rara', imagen: '/Cartas/agujero-de-serpiente.png', descripcion: 'Te teletransporta a una casilla aleatoria del tablero', efecto: 'Efecto 16' },
      { nombre: "Bolsillo roto", tipo: "Debuff", rareza: "comun", imagen: "/Cartas/bolsillo-roto.png", descripcion: "Le quitas todas las cartas a un jugador y solo podrá robar 1 carta", efecto: "Efecto 17" },
      { nombre: "Compañerismo obligado", tipo: "Bufo", rareza: "epica", imagen: "/Cartas/compañerismo-obligatorio.png", descripcion: "Teletransporta a tu ficha a la posición de la ficha aliada más avanzada", efecto: "Efecto 18" },
      { nombre: "Coleccionista", tipo: "Bufo", rareza: "rara", imagen: "/Cartas/coleccionista.png", descripcion: "Roba dos cartas en tu próximo turno", efecto: "Efecto 19" },
      { nombre: "Noqueo", tipo: "Debuff", rareza: "epica", imagen: "/Cartas/noqueo.png", descripcion: "Cancela el próximo turno de un rival", efecto: "Efecto 20" },

    ];

    /* --- CÓDIGO REAL PARA EL FUTURO ---
    const response = await fetch(`${API_URL}/users/${email}/cards`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Error al obtener las cartas');
    return data as Carta[];
    */
  }
};