import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HuntsService } from '../../../services/hunts.service';
import { CreateHuntModel, GetHuntModel } from '../../../models/hunt.model';
import { Observable } from 'rxjs';
import { UsersService } from '../../../services/users.service';
import { UserModel } from '../../../models/user.model';
import { UserFilterPipe } from './user-filter.pipe';

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, UserFilterPipe],
  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.scss'
})
export class DashboardAdminComponent {
  hunts: GetHuntModel[] = [];
  huntForm: FormGroup;
  isEditing: boolean = false;
  editingHuntId: number | null = null;
  loading: boolean = false;
  error: string | null = null;

  // Utilisateurs
  users: UserModel[] = [];
  userForm: FormGroup;
  isEditingUser: boolean = false;
  editingUserId: number | null = null;
  loadingUsers: boolean = false;
  userError: string | null = null;
  userSuccess: string | null = null;
  userSearch: string = '';

  private readonly huntsService = inject(HuntsService);
  private readonly fb = inject(FormBuilder);
  private readonly usersService = inject(UsersService);

  constructor() {
    this.huntForm = this.fb.group({
      titre: [''],
      description: [''],
      lieu: [''],
      prix: [''],
      date_debut: [''],
      date_fin: [''],
      est_prive: [false],
    });

    this.userForm = this.fb.group({
      pseudo: [''],
      mail: [''],
      creerChasse: [false],
      date_activation: [''],
      date_desactivation: [''],
      solde_couronne: [''],
    });
  }

  ngOnInit() {
    console.log('[Admin] Initialisation du composant admin');
    this.fetchHunts();
    this.fetchUsers();
  }

  fetchHunts() {
    this.loading = true;
    console.log('[Admin] Chargement des chasses...');
    this.huntsService.getAll().subscribe({
      next: (data) => {
        this.hunts = data;
        this.loading = false;
        console.log('[Admin] Chasses chargées:', data);
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement des chasses';
        this.loading = false;
        console.error('[Admin] Erreur chargement chasses:', err);
      }
    });
  }

  onSubmit() {
    if (this.huntForm.invalid) return;
    let huntData = { ...this.huntForm.value };
    // Valeurs par défaut pour les champs requis par l'API
    huntData.participants = [];
    huntData.caches = [];
    huntData.themes = [1];
    huntData.couleur = huntData.couleur || '#000000';
    huntData.nombre_participant = huntData.nombre_participant || 0;
    huntData.monde = huntData.monde || 'Réel';
    huntData.messagerie_est_actif = huntData.messagerie_est_actif ?? false;
    huntData.est_prive = !!huntData.est_prive;
    huntData.createur = 25;
    // Conversion des dates au format ISO si besoin
    if (huntData.date_debut) huntData.date_debut = new Date(huntData.date_debut).toISOString();
    if (huntData.date_fin) huntData.date_fin = new Date(huntData.date_fin).toISOString();
    // Création ou édition
    if (this.isEditing && this.editingHuntId !== null) {
      this.huntsService.update(this.editingHuntId, huntData).subscribe({
        next: () => {
          this.fetchHunts();
          this.cancelEdit();
        },
        error: (err: any) => {
          this.error = 'Erreur lors de la modification';
        }
      });
    } else {
      this.huntsService.create(huntData).subscribe({
        next: () => {
          this.fetchHunts();
          this.huntForm.reset();
        },
        error: (err: any) => {
          this.error = 'Erreur lors de la création';
        }
      });
    }
  }

  editHunt(hunt: GetHuntModel) {
    this.isEditing = true;
    this.editingHuntId = hunt.id;
    this.huntForm.patchValue({
      titre: hunt.titre,
      lieu: hunt.lieu,
      date_debut: hunt.date_debut ? new Date(hunt.date_debut).toISOString().substring(0, 10) : '',
      date_fin: hunt.date_fin ? new Date(hunt.date_fin).toISOString().substring(0, 10) : '',
      prix: hunt.prix,
      description: hunt.description,
      couleur: hunt.couleur,
      nombre_participant: hunt.nombre_participant,
      est_prive: hunt.est_prive,
    });
    console.log('[Admin] Edition mode activé pour la chasse', hunt.id);
  }

  cancelEdit() {
    this.isEditing = false;
    this.editingHuntId = null;
    this.huntForm.reset();
    console.log('[Admin] Edition annulée');
  }

  deleteHunt(id: number) {
    if (!confirm('Supprimer cette chasse ?')) return;
    console.log('[Admin] Suppression chasse', id);
    this.huntsService.delete(id).subscribe({
      next: () => {
        console.log('[Admin] Chasse supprimée');
        this.fetchHunts();
      },
      error: (err: any) => {
        this.error = 'Erreur lors de la suppression';
        console.error('[Admin] Erreur suppression:', err);
      }
    });
  }

  fetchUsers() {
    this.loadingUsers = true;
    this.usersService.getAll().subscribe({
      next: (data) => {
        this.users = data;
        this.loadingUsers = false;
      },
      error: (err) => {
        this.userError = 'Erreur lors du chargement des utilisateurs';
        this.loadingUsers = false;
      }
    });
  }

  onSubmitUser() {
    if (this.userForm.invalid) return;
    const userData = this.userForm.value;
    if (this.isEditingUser && this.editingUserId !== null) {
      this.usersService.update(this.editingUserId, userData).subscribe({
        next: () => {
          this.userSuccess = 'Utilisateur modifié avec succès';
          this.fetchUsers();
          this.cancelEditUser();
        },
        error: (err: any) => {
          this.userError = 'Erreur lors de la modification';
        }
      });
    } else {
      this.usersService.create(userData).subscribe({
        next: () => {
          this.userSuccess = 'Utilisateur créé avec succès';
          this.fetchUsers();
          this.userForm.reset();
        },
        error: (err: any) => {
          this.userError = 'Erreur lors de la création';
        }
      });
    }
  }

  editUser(user: UserModel) {
    this.isEditingUser = true;
    this.editingUserId = user.id;
    this.userForm.patchValue(user);
  }

  cancelEditUser() {
    this.isEditingUser = false;
    this.editingUserId = null;
    this.userForm.reset();
  }

  deleteUser(id: number) {
    if (!confirm('Supprimer cet utilisateur ?')) return;
    this.usersService.delete(id).subscribe({
      next: () => {
        this.userSuccess = 'Utilisateur supprimé avec succès';
        this.fetchUsers();
      },
      error: (err: any) => {
        this.userError = 'Erreur lors de la suppression';
      }
    });
  }
}
