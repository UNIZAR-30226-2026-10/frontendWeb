export interface Invitacion {
  inviteFor: string;
  inviteFrom: string;
  partidaID: string; // En tu backend se guarda como partidaID (que es el ID del lobby)
}