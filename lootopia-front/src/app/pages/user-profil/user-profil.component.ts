import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserModel } from '../../models/user.model';
import { HuntModel } from '../../models/hunt.model';
import { parseIsoDateTime } from '../../utils/common';

@Component({
  selector: 'app-user-profil',
  imports: [CommonModule, FormsModule],
  templateUrl: './user-profil.component.html',
  styleUrl: './user-profil.component.scss'
})
export class UserProfilComponent implements OnInit {
  utilisateur: UserModel = {
    id: 4,
    pseudo: 'test',
    mail: 'test@test.test',
    creerChasse: false,
    date_activation: '2025-06-17T16:57:42.084121Z',
    date_desactivation:'',
    solde_couronne: 0
  };

  chassesCreees: HuntModel[] = [
    {
      id: 1,
      titre: 'Chasse au trésor',
      description: 'Trouvez le trésor caché dans la forêt.',
      createur: 'test',
      date_debut: new Date('2025-06-01T18:00:00.000Z'),
      date_fin: new Date('2025-06-10T18:00:00.000Z'),
      participants: [],
      caches: [],
      couleur: 'DJDJS00',
      prix: 60,
      nombre_participant: 0,
      lieu: 'Nantes',
      monde: 'Réel',
      est_prive: false,
      messagerie_est_actif: true,
      themes: []
    },
    {
      id: 1,
      titre: 'Chasse au trésor',
      description: 'Trouvez le trésor caché dans la forêt.',
      createur: 'test',
      date_debut: new Date('2025-06-01T18:00:00.000Z'),
      date_fin: new Date('2025-06-10T18:00:00.000Z'),
      participants: [],
      caches: [],
      couleur: 'DJDJS00',
      prix: 60,
      nombre_participant: 0,
      lieu: 'Nantes',
      monde: 'Réel',
      est_prive: false,
      messagerie_est_actif: true,
      themes: []
    },
    {
      id: 1,
      titre: 'Chasse au trésor',
      description: 'Trouvez le trésor caché dans la forêt.',
      createur: 'test',
      date_debut: new Date('2025-06-01T18:00:00.000Z'),
      date_fin: new Date('2025-06-10T18:00:00.000Z'),
      participants: [],
      caches: [],
      couleur: 'DJDJS00',
      prix: 60,
      nombre_participant: 0,
      lieu: 'Nantes',
      monde: 'Réel',
      est_prive: false,
      messagerie_est_actif: true,
      themes: []
    },
    {
      id: 1,
      titre: 'Chasse au trésor',
      description: 'Trouvez le trésor caché dans la forêt.',
      createur: 'test',
      date_debut: new Date('2025-06-01T18:00:00.000Z'),
      date_fin: new Date('2025-06-10T18:00:00.000Z'),
      participants: [],
      caches: [],
      couleur: 'DJDJS00',
      prix: 60,
      nombre_participant: 0,
      lieu: 'Nantes',
      monde: 'Réel',
      est_prive: false,
      messagerie_est_actif: true,
      themes: []
    }
    // Ajoute d'autres chasses si besoin
  ];

  // Formulaire de création de chasse
  nouvelleChasse: Partial<HuntModel> = {
    titre: '',
    description: '',
    date_debut: new Date(),
    date_fin: new Date(),
  };

  constructor() { }

  ngOnInit(): void {}

  public parseIsoDateTime(isoString: string, forTime: string =''): string {
    const date = parseIsoDateTime(isoString, forTime);
    return date;
  }

  creerChasse() {
    if (
      this.nouvelleChasse.titre &&
      this.nouvelleChasse.description &&
      this.nouvelleChasse.date_debut &&
      this.nouvelleChasse.date_fin
    ) {
      const nouvelle: HuntModel = {
        id: this.chassesCreees.length + 1,
        titre: this.nouvelleChasse.titre,
        description: this.nouvelleChasse.description,
        createur: this.utilisateur.pseudo,
        date_debut: this.nouvelleChasse.date_debut,
        date_fin: this.nouvelleChasse.date_fin,
        participants: [],
        caches: [],
        couleur: '',
        prix: 0,
        nombre_participant: 0,
        lieu: '',
        monde: '',
        est_prive: false,
        messagerie_est_actif: false,
        themes: []
      };
      this.chassesCreees.push(nouvelle);
      this.nouvelleChasse = { titre: '', description: '', date_debut: new Date(), date_fin: new Date() };
    }
  }
}
