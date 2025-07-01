import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserModel } from '../../models/user.model';
import { HuntModel } from '../../models/hunt.model';
import { parseIsoDateTime } from '../../utils/common';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-profil',
  imports: [CommonModule, FormsModule],
  templateUrl: './user-profil.component.html',
  styleUrl: './user-profil.component.scss'
})
export class UserProfilComponent implements OnInit {
  public utilisateur!: UserModel;

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

  // Formulaire de création de chasse : Partial<Typeof HuntModel> permet de ne pas remplir tous les champs
  // et de ne pas avoir d'erreur de type
  nouvelleChasse: Partial<HuntModel> = {
    titre: '',
    description: '',
    date_debut: new Date(),
    date_fin: new Date(),
  };

  constructor(private userService: UsersService) { }

  ngOnInit(): void {

    this.getUserById(3);

    // Récupération des chasses créées par l'utilisateur
    this.userService.getByUserHunts(this.utilisateur.id).subscribe({
      next: (chasses) => {
        this.chassesCreees = chasses;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des chasses créées :', err);
      }
    });
  }

  public parseIsoDateTime(isoString: string, forTime: string =''): string {
    const date = parseIsoDateTime(isoString, forTime);
    return date;
  }

  private getUserById(id: number) {
    this.userService.getById(id).subscribe({
      next: (user) => {
        this.utilisateur = user;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération de l\'utilisateur :', err);
      }
    });
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
