import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HuntsService } from '../../services/hunts.service';
import { HuntModel } from '../../models/hunt.model';
import { FormsModule } from '@angular/forms';
import { parseIsoDateTime } from '../../utils/common';
import { Message } from '../../models/message.model';

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

  constructor(
    private route: ActivatedRoute, 
    private huntsService: HuntsService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id: number | null = idParam !== null ? Number(idParam) : null;
    this.getHuntById(id);
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
    // Ajoute ici la logique d'inscription
    alert("Inscription à la chasse !");
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
