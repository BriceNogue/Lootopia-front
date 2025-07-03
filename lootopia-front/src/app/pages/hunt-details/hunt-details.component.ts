import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HuntsService } from '../../services/hunts.service';
import { GetHuntModel } from '../../models/hunt.model';
import { FormsModule } from '@angular/forms';
import { parseIsoDateTime } from '../../utils/common';
import { Message } from '../../models/message.model';
import { getCurentUserId } from '../../utils/common';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-hunt-details',
  imports: [CommonModule, FormsModule],
  templateUrl: './hunt-details.component.html',
  styleUrl: './hunt-details.component.scss'
})
export class HuntDetailsComponent {
  hunt: any;
  loading = true;
  messages: Message[] = [];
  newMessage = '';
  public curentUserId: number | null = null;
  private huntId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private huntsService: HuntsService
  ) {}

  ngOnInit(): void {
    this.getCurentUser();
    const idParam = this.route.snapshot.paramMap.get('id');
    this.huntId = idParam !== null ? Number(idParam) : null;
    this.getHuntById(this.huntId);
  }

  getCurentUser() {
    const userId = getCurentUserId();
    if (userId) {
      this.curentUserId = userId;
    } else {
      //alert('Vous devez être connecté pour accéder à cette page.');
      //console.error('Aucun utilisateur connecté trouvé. Redirection vers la page de connexion.');
      this.curentUserId = null;
      //this.goToLogin();
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  private getHuntById(id: number | null): void {
    
    if (id !== null && !isNaN(id)) {
      this.huntsService.getById(id).subscribe({
        next: (data) => {
          this.hunt = data;
          this.loading = false;
          // Simule des messages pour la démo
          if (this.hunt.messagerie_est_actif) {
            this.messages = [
              { id: 1, auteur: 1, date_heure: new Date('01-01-2025'), content: 'Bienvenue à tous !', chasse: this.hunt?.id },
              { id: 2, auteur: 2, date_heure: new Date('01-01-2025'), content: 'Prêt pour la chasse ?', chasse: this.hunt?.id }
            ];
          }
        },
        error: (error) => {
          console.error('Error fetching hunt details:', error);
          this.loading = false;
        }
      });
    } else {
      console.error('No hunt ID provided in route parameters.');
      this.loading = false;
    }
  }

  public parseIsoDateTime(isoString: string, forTime: string =''): string {
    const date = parseIsoDateTime(isoString, forTime);
    return date;
  }

  registerToHunt() {
    if (!this.curentUserId) {
      alert('Vous devez être connecté pour vous inscrire à une chasse.');
      console.error('Utilisateur non connecté. Impossible de s\'inscrire à la chasse.');
      return;
    }

    this.huntsService.registerToHunt(this.hunt.id, this.curentUserId || 0).subscribe({
      next: () => {
        console.log('Inscription réussie à la chasse !');
        alert('Inscription réussie à la chasse !');
        this.getHuntById(this.huntId);
      },
      error: (error) => {
        console.error('Erreur lors de l\'inscription à la chasse :', error);
      }
    });
  }

  goBack() {
    window.history.back();
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      this.messages.push({
        id: 0, // ID sera géré par le backend
        chasse: this.hunt.id,
        auteur: this.hunt.createur,
        date_heure: new Date(),
        content: this.newMessage,
      });
      this.newMessage = '';
    }
  }
}
