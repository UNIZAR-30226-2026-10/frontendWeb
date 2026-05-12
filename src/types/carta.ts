export interface Carta {
  nombre: string;
  tipo: string;
  calidad: string; // Cambiado de 'rareza' a 'calidad' (como en el back)
  descripcion: string;
  imagen: string;
  efecto: string;
}
export default Carta;