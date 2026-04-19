import ItemTienda from './itemTienda';

export interface SeccionTienda {
  nombre: string;
  items: ItemTienda[];
}

export interface TiendaUI {
  secciones: SeccionTienda[];
  sepDisponible: number;
}
