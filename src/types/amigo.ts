export interface Amigo {
  id: string;
  nombre: string;
  estado: 'online' | 'invitado' | 'desconectado';
  avatar: string;
}
