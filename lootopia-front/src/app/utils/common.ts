import { UserModel } from "../models/user.model";

export function parseIsoDate(isoString: string): Date {
  return new Date(isoString);
}

export function parseIsoDateTime(isoString: string, forTime: string = ''): string {
  // Convertit une chaîne de date ISO en une chaîne formatée "DD-MM-YYYY HH:mm"
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Les mois commencent à 0
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${day}-${month}-${year} ${forTime} ${hours}:${minutes}`;
}

export function getCurentUser(): UserModel | null {
  // Récupère l'utilisateur actuel depuis le localStorage
  const user = localStorage.getItem('user');
  if (user) {
    return JSON.parse(user) as UserModel;
  }
  return null;
}