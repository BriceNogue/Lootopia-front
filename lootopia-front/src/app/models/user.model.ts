export interface UserModel {
  id: number;
  pseudo: string;
  mail: string;
  creerChasse: boolean;
  date_activation: Date | string;
  date_desactivation: Date | string;
  solde_couronne: number;
}