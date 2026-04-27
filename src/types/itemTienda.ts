
export type tipoSkin = 'escalera' | 'serpiente' | 'icono' | 'ficha';

export interface CosmeticoAPI {
  nomCosmetico: string;
  precio: number;
  desc: string;
  loTiene: boolean;
}

export const TIPOS_COSMETICS: Record<string, tipoSkin> = {
  'escalera': 'escalera',
  'serpiente': 'serpiente',
  'icono': 'icono',
  'ficha': 'ficha',
};

interface ItemTienda {
    nombre: string;
    tipo: tipoSkin;
    precio: number;
    imagen: string; //URL de la imagen del item
    comprado: boolean; //Indica si el item ya ha sido comprado por el usuario
}
export default ItemTienda;