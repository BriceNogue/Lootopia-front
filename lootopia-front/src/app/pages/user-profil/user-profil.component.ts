import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserModel } from '../../models/user.model';
import { HuntModel } from '../../models/hunt.model';
import { parseIsoDateTime } from '../../utils/common';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HuntsService } from '../../services/hunts.service';

@Component({
  selector: 'app-user-profil',
  imports: [CommonModule, FormsModule],
  templateUrl: './user-profil.component.html',
  styleUrl: './user-profil.component.scss'
})
export class UserProfilComponent implements OnInit {
  public utilisateur!: UserModel;

  chassesCreees: HuntModel[] = [
    /*{
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
    }*/
    // Ajoute d'autres chasses si besoin
  ];

  // Formulaire de création de chasse : Partial<Typeof HuntModel> permet de ne pas remplir tous les champs
  // et de ne pas avoir d'erreur de type
  nouvelleChasse: Partial<HuntModel> = {
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

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const userId: number | null = idParam !== null ? Number(idParam) : null;

    this.getUserById(userId || 0);
    
    // Récupération des chasses créées par l'utilisateur
    this.getUserHunts(this.utilisateur.pseudo);
  }

  public parseIsoDateTime(isoString: string, forTime: string =''): string {
    const date = parseIsoDateTime(isoString, forTime);
    return date;
  }

  private getUserById(id: number) {
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
      const newHunt: HuntModel = {
        id: 0,
        titre: this.nouvelleChasse.titre,
        description: this.nouvelleChasse.description,
        createur: this.utilisateur.pseudo,
        date_debut: this.nouvelleChasse.date_debut,
        date_fin: this.nouvelleChasse.date_fin,
        participants: [],
        caches: [],
        couleur: 'F00000',
        prix: this.nouvelleChasse.prix || 0,
        nombre_participant: 0,
        lieu: this.nouvelleChasse.lieu || '',
        monde: this.nouvelleChasse.monde || '',
        est_prive: this.nouvelleChasse.est_prive || false,
        messagerie_est_actif: this.nouvelleChasse.messagerie_est_actif || false,
        themes: []
      };
      this.huntService.create(newHunt).subscribe({
        next: (createdHunt) => {
          alert('Chasse créée avec succès !');
          console.log('Chasse créée avec succès :', createdHunt);
          // Réinitialiser le formulaire après la création
          this.chassesCreees.push(newHunt);
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

  public getUserHunts(pseudo: string): void {
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
