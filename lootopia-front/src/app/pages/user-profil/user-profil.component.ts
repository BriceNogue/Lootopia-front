import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserModel } from '../../models/user.model';
import { GetHuntModel, CreateHuntModel } from '../../models/hunt.model';
import { parseIsoDateTime } from '../../utils/common';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HuntsService } from '../../services/hunts.service';
import { getCurentUserId } from '../../utils/common';

@Component({
  selector: 'app-user-profil',
  imports: [CommonModule, FormsModule],
  templateUrl: './user-profil.component.html',
  styleUrl: './user-profil.component.scss'
})
export class UserProfilComponent implements OnInit {
  public utilisateur: UserModel | null = null;
  public chassesCreees: GetHuntModel[] | undefined;
  /*= [
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
  ];*/
  private curentUserId: number | null = null;

  // Formulaire de création de chasse : Partial<Typeof HuntModel> permet de ne pas remplir tous les champs
  // et de ne pas avoir d'erreur de type
  nouvelleChasse: Partial<CreateHuntModel> = {
    titre: '',
    description: '',
    lieu: '',
    monde: '',
    prix: 0,
    est_prive: false,
    messagerie_est_actif: false,
    date_debut: "",
    date_fin: "",
  };

  constructor(private route: ActivatedRoute, private router: Router, private userService: UsersService, private huntService: HuntsService) { }

  ngBeforeInit(): void {
    // Initialisation de l'utilisateur avec un pseudo par défaut pour éviter les erreurs 
  }

  async ngOnInit(): Promise<void> {
    // const idParam = this.route.snapshot.paramMap.get('id');
    // const userId: number | null = idParam !== null ? Number(idParam) : null;

    this.getCurentUserId();

    await this.getUserById(this.curentUserId || 0);
    console.log('Curent user id :', this.curentUserId);
    console.log('Utilisateur récupéré :', this.utilisateur);

    // Si l'utilisateur n'est pas trouvé, on attend qu'il soit défini
    // Cela peut être utile si l'utilisateur est récupéré de manière asynchrone
    while (!this.utilisateur) {
      console.log('En attente de l\'utilisateur...');
      await new Promise(resolve => setTimeout(resolve, 1000)); // Attente de 1 seconde
    }

    // Récupération des chasses créées par l'utilisateur
    if (this.utilisateur && this.utilisateur.pseudo) {
      this.getUserHunts(this.utilisateur.pseudo);
    }
  }

  getCurentUserId() {
    const userId = getCurentUserId();
    if (userId) {
      this.curentUserId = userId;
    } else {
      alert('Vous devez être connecté pour accéder à cette page.');
      console.error('Aucun utilisateur connecté trouvé. Redirection vers la page de connexion.');
      this.curentUserId = null;
      this.utilisateur = null; // Assurez-vous que l'utilisateur est nul si non connecté
      this.goToLogin();
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  public parseIsoDateTime(isoString: string, forTime: string =''): string {
    const date = parseIsoDateTime(isoString, forTime);
    return date;
  }

  private async getUserById(id: number) : Promise<void> {
    this.userService.getById(id).subscribe({
      next: (user) => {
        this.utilisateur = user;
        console.log('Utilisateur récupéré avec succès :', this.utilisateur);
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
      this.nouvelleChasse.lieu &&
      this.nouvelleChasse.monde &&
      this.nouvelleChasse.date_debut &&
      this.nouvelleChasse.date_fin
    ) {
      const newHunt: CreateHuntModel = {
        id: 0,
        titre: this.nouvelleChasse.titre,
        description: this.nouvelleChasse.description,
        createur: this.utilisateur?.id || 0, // Utiliser l'ID de l'utilisateur connecté
        date_debut: this.nouvelleChasse.date_debut,
        date_fin: this.nouvelleChasse.date_fin,
        participants: [],
        caches: [],
        couleur: '000000',
        prix: this.nouvelleChasse.prix || 0,
        nombre_participant: 0,
        lieu: this.nouvelleChasse.lieu || '',
        monde: this.nouvelleChasse.monde || '',
        est_prive: this.nouvelleChasse.est_prive || false,
        messagerie_est_actif: this.nouvelleChasse.messagerie_est_actif || false,
        themes: [1]
      };
      this.huntService.create(newHunt).subscribe({
        next: (createdHunt) => {
          //alert('Chasse créée avec succès !');
          this.getUserHunts(this.utilisateur?.pseudo || '');
          console.log('Chasse créée avec succès :', createdHunt);
          this.goToHuntDetail(createdHunt.id);
          // Réinitialiser le formulaire après la création
          this.resetForm();
        },
        error: (err) => {
          alert('Erreur lors de la création de la chasse. Veuillez réessayer.');
          console.error('Erreur lors de la création de la chasse :', err);
        }
      });
    }
  }

  // Méthode pour réinitialiser le formulaire de création de chasse
  resetForm() {
    this.nouvelleChasse = {
        titre: '',
        description: '',
        lieu: '',
        monde: '',
        prix: 0,
        est_prive: false,
        messagerie_est_actif: false,
        date_debut: "",
        date_fin: "",
      };
  }

  public goToHuntDetail(id: number): void {
    this.router.navigate(['/hunt/'+id])
  }

  private async getUserHunts(pseudo: string): Promise<void> {
    this.userService.getUserHunts(pseudo).subscribe({
      next: (hunts) => {
        this.chassesCreees = hunts;
        console.log('Chasses récupérées avec succès :', hunts);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des chasses :', err);
      }
    });
  }
}
