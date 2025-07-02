export interface UserModel {
  id: number;
  pseudo: string;
  mail: string;
  creerChasse: boolean;
  date_activation: string;
  date_desactivation: string;
  solde_couronne: number;
}