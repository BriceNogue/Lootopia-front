import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HuntsService } from '../../../services/hunts.service';
import { HuntModel } from '../../../models/hunt.model';

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
      title: [''],
      location: [''],
      startDate: [''],
      endDate: [''],
      price: [''],
      description: [''],
      difficulty: [''],
      reward: [''],
      isPrivate: [false],
      maxParticipants: ['']
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
        error: (err) => {
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
        error: (err) => {
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
      title: hunt.title,
      location: hunt.location,
      startDate: hunt.startDate ? new Date(hunt.startDate).toISOString().substring(0, 10) : '',
      endDate: hunt.endDate ? new Date(hunt.endDate).toISOString().substring(0, 10) : '',
      price: hunt.price,
      description: hunt.description,
      difficulty: hunt.difficulty,
      reward: hunt.reward,
      isPrivate: hunt.isPrivate,
      maxParticipants: hunt.maxParticipants
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
      error: (err) => {
        this.error = 'Erreur lors de la suppression';
        console.error('[Admin] Erreur suppression:', err);
      }
    });
  }
}
