export enum Roles {
  VISITEUR = 'Visiteur',
  ADMIN = 'Admin',
  TESTEUR = 'Testeur',
  DEFAULT = 'Default',
}

export interface User {
  iduser?: number;
  nom?: string;
  prenom?: string;
  email: string;
  numtel?: string;
  login: string;
  mdp: string; 
  role?: Roles;

}