export interface User {
    iduser?: number;
    nom?: string;
    prenom?: string;
    email: string;
    numtel?: string;
    login: string;
    mdp: string; 
    role?: Roles;
    operations?: Operation[];
    traces?: Trace[]; 
    numseries?: NumSerie[]; 
  }
  
  export enum Roles {
    VISITEUR = 'Visiteur',
    ADMIN = 'Admin',
    TESTEUR = 'Testeur',
  }




export interface Operation {
  }
  
  export interface Trace {
  }
  
  export interface NumSerie {
  }