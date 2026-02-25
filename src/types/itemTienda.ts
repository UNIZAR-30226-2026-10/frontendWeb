
export type tipoSkin = 'escalera' | 'serpiente' | 'icono' | 'ficha';
interface ItemTienda {
    nombre: string;
    tipo: tipoSkin;
    precio: number;
    imagen: string; //URL de la imagen del item
    comprado: boolean; //Indica si el item ya ha sido comprado por el usuario
}
export default ItemTienda;