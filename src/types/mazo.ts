import Carta from "./carta";

interface Mazo {
    nombre: string;
    cartas: Carta[]; //Lista de cartas que componen el mazo
    enUso: boolean; //Indica si el mazo está siendo utilizado en una partida, para mostrar un mensaje de advertencia al intentar editar o borrar el mazo
}

export default Mazo;