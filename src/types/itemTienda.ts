
export type tipoSkin = 'Skin_Escalera' | 'Skin_Serpiente' | 'Icono' | 'Skin_Ficha';

export interface CosmeticoAPI {
  nomCosmetico: string;
  precio: number;
  desc: string;
  loTiene: boolean;
}

export const TIPOS_COSMETICS: Record<string, tipoSkin> = {
  'Skin_Escalera': 'Skin_Escalera',
  'Skin_Serpiente': 'Skin_Serpiente',
  'Icono': 'Icono',
  'Skin_Ficha': 'Skin_Ficha',
};

interface ItemTienda {
    nombre: string;
    tipo: tipoSkin;
    precio: number;
    imagen: string; //URL de la imagen del item
    comprado: boolean; //Indica si el item ya ha sido comprado por el usuario
}
export default ItemTienda;