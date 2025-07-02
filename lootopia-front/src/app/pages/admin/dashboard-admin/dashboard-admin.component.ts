import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HuntsService } from '../../../services/hunts.service';
import { HuntModel } from '../../../models/hunt.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.scss'
})
export class DashboardAdminComponent {
  hunts: HuntModel[] = [];
  huntForm: FormGroup;
  isEditing: boolean = false;
  editingHuntId: number | null = null;
  loading: boolean = false;
  error: string | null = null;

  private readonly huntsService = inject(HuntsService);
  private readonly fb = inject(FormBuilder);

  constructor() {
    this.huntForm = this.fb.group({
      titre: [''],
      lieu: [''],
      date_debut: [''],
      date_fin: [''],
      prix: [''],
      description: [''],
      couleur: [''],
      nombre_participant: [''],
      est_prive: [false],
    });
  }

  ngOnInit() {
    console.log('[Admin] Initialisation du composant admin');
    this.fetchHunts();
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
    const huntData = this.huntForm.value;
    if (this.isEditing && this.editingHuntId !== null) {
      console.log('[Admin] Edition chasse', this.editingHuntId, huntData);
      this.huntsService.update(this.editingHuntId, huntData).subscribe({
        next: () => {
          console.log('[Admin] Chasse modifiée');
          this.fetchHunts();
          this.cancelEdit();
        },
        error: (err: any) => {
          this.error = 'Erreur lors de la modification';
          console.error('[Admin] Erreur modification:', err);
        }
      });
    } else {
      console.log('[Admin] Création chasse', huntData);
      this.huntsService.create(huntData).subscribe({
        next: () => {
          console.log('[Admin] Chasse créée');
          this.fetchHunts();
          this.huntForm.reset();
        },
        error: (err: any) => {
          this.error = 'Erreur lors de la création';
          console.error('[Admin] Erreur création:', err);
        }
      });
    }
  }

  editHunt(hunt: HuntModel) {
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
}
