import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreateHuntModel, GetHuntModel } from '../../models/hunt.model';
import { HuntsService } from '../../services/hunts.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-hunt',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-hunt.component.html',
  styleUrl: './edit-hunt.component.scss'
})
export class EditHuntComponent implements OnInit {
  updatedHunt: Partial<CreateHuntModel> = {
    titre: '',
    description: '',
    lieu: '',
    monde: '',
    prix: undefined,
    nombre_participant: undefined,
    est_prive: false,
    messagerie_est_actif: false,
    date_debut: '',
    date_fin: ''
  };

  huntId: number | null = null;
  curentHunt: GetHuntModel | undefined;

  constructor(
    private route: ActivatedRoute,
    private huntsService: HuntsService
  ) {}

  async ngOnInit(): Promise<void> {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.huntId = idParam !== null ? Number(idParam) : null;

    this.getHuntById(this.huntId);

    while (!this.curentHunt) {
      console.log('En attente de l\'utilisateur...');
      await new Promise(resolve => setTimeout(resolve, 1000)); // Attente de 1 seconde
    }

    this.InitializeForm();
  }

  private InitializeForm() {
    console.log('Initializing form with current hunt data:', this.curentHunt);
    if (this.curentHunt) {
      this.updatedHunt = {
        titre: this.curentHunt.titre,
        description: this.curentHunt.description,
        lieu: this.curentHunt.lieu,
        monde: this.curentHunt.monde,
        prix: this.curentHunt.prix,
        nombre_participant: this.curentHunt.nombre_participant,
        est_prive: this.curentHunt.est_prive,
        messagerie_est_actif: this.curentHunt.messagerie_est_actif,
        date_debut: this.curentHunt.date_debut ? new Date(this.curentHunt.date_debut).toISOString().slice(0, 16) : '',
        date_fin: this.curentHunt.date_fin ? new Date(this.curentHunt.date_fin).toISOString().slice(0, 16) : ''
      };
    }
  }

  onSubmit() {
    if (this.huntId !== null) {
      this.curentHunt = {
        //id: this.huntId,
        //participants: this.curentHunt?.participants || [],
        //createur: this.curentHunt?.createur || 0,
        titre: this.updatedHunt.titre || '',
        description: this.updatedHunt.description || '',
        //couleur: this.curentHunt?.couleur || '#000000',
        lieu: this.updatedHunt.lieu || '',
        monde: this.updatedHunt.monde || '',
        prix: this.updatedHunt.prix || undefined,
        nombre_participant: this.updatedHunt.nombre_participant || undefined,
        date_debut: this.updatedHunt.date_debut ? new Date(this.updatedHunt.date_debut).toISOString() : '',
        date_fin: this.updatedHunt.date_fin ? new Date(this.updatedHunt.date_fin).toISOString() : '',
        est_prive: this.updatedHunt.est_prive || false,
        messagerie_est_actif: this.updatedHunt.messagerie_est_actif || false,      
        //themes: this.curentHunt?.themes || []
      } as GetHuntModel;
      
      if(!confirm('Êtes-vous sûr de vouloir mettre à jour cette chasse ?')) {
        console.log('Mise à jour annulée par l\'utilisateur.');
        return;
      }

      this.huntsService.update(this.huntId, this.curentHunt).subscribe({
        next: (data) => {
          alert('Chasse mise à jour avec succès !');
          console.log('Chasse mise à jour avec succès !', data);
          this.goBack();
          // Redirection ou autre action après la mise à jour
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour de la chasse:', error);
        }
      });
    } else {
      console.error('Aucun ID de chasse trouvé pour la mise à jour.');
    }
  }

  private getHuntById(id: number | null): void {
    
    if (id !== null && !isNaN(id)) {
      this.huntsService.getById(id).subscribe({
        next: (data) => {
          this.curentHunt = data;
          //this.loading = false;
          // Simule des messages pour la démo
          // if (this.hunt.messagerie_est_actif) {
          //   this.messages = [
          //     { id: 1, auteur: 1, date_heure: new Date('01-01-2025'), content: 'Bienvenue à tous !', chasse: this.hunt?.id },
          //     { id: 2, auteur: 2, date_heure: new Date('01-01-2025'), content: 'Prêt pour la chasse ?', chasse: this.hunt?.id }
          //   ];
          // }
        },
        error: (error) => {
          console.error('Error fetching hunt details:', error);
          //this.loading = false;
        }
      });
    } else {
      console.error('No hunt ID provided in route parameters.');
      //this.loading = false;
    }
  }

  goBack() {
    window.history.back();
  }
}
