export interface HuntModel {
    id: string;
    title: string; // Titre de la chasse au trésor
    description: string; // Description de la chasse au trésor
    huntImage: string; // URL de l'image de la chasse au trésor
    startDate: Date; // Date de début de la chasse au trésor
    endDate: Date; // Date de fin de la chasse au trésor
    difficulty: string; // Difficulté de la chasse au trésor (facile, moyen, difficile)
    reward: number; // Montant de la récompense
    isPrivate: boolean; // Indique si la chasse au trésor est privée ou publique
    isCompleted: boolean; // Indique si la chasse au trésor est terminée
    participants: number; // Nombre de participants
    maxParticipants: number; // Nombre maximum de participants
    location: string; // Lieu de la chasse au trésor
    creatorId: string; // ID de l'utilisateur qui a créé la chasse au trésor
    createdAt: Date; // Date de création de la chasse au trésor
}