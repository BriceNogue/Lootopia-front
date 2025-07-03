export interface GetHuntModel {
    // id: number; // ID unique de la chasse au trésor
    // title: string; // Titre de la chasse au trésor
    // description: string; // Description de la chasse au trésor
    // huntImage: string | undefined; // URL de l'image de la chasse au trésor
    // startDate: Date; // Date de début de la chasse au trésor
    // endDate: Date; // Date de fin de la chasse au trésor
    // difficulty: string; // Difficulté de la chasse au trésor (facile, moyen, difficile)
    // price: number; // Prix d'entrée pour participer à la chasse au trésor
    // reward: number; // Montant de la récompense
    // isPrivate: boolean; // Indique si la chasse au trésor est privée ou publique
    // isCompleted: boolean; // Indique si la chasse au trésor est terminée
    // participants: number; // Nombre de participants
    // maxParticipants: number; // Nombre maximum de participants
    // location: string; // Lieu de la chasse au trésor
    // creatorId: number; // ID de l'utilisateur qui a créé la chasse au trésor
    // createdAt: Date; // Date de création de la chasse au trésor

    id: number;
    participants: number[];
    caches: number[];
    description: string;
    createur: string;
    titre: string;
    couleur: string;
    prix: number;
    date_debut: string;
    date_fin: string;
    nombre_participant: number;
    lieu: string;
    monde: string;
    est_prive: boolean;
    messagerie_est_actif: boolean;
    themes: number[];
}

export interface CreateHuntModel {
    participants: number[];
    caches: number[];
    titre: string;
    couleur: string;
    prix: number;
    date_fin: string;
    nombre_participant: number;
    lieu: string;
    monde: string;
    est_prive: boolean;
    messagerie_est_actif: boolean;
    createur: number;
    themes: number[];
    description?: string;
  }
  