import { Component, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HuntsService } from '../../services/hunts.service';
import { HuntModel } from '../../models/hunt.model';
import { parseIsoDate, parseIsoDateTime } from '../../utils/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [
    // Importation des modules nécessaires pour le composant
    CommonModule, // Nécessaire pour utiliser les directives Angular comme *ngIf, *ngFor, etc.
    FormsModule, // Nécessaire pour utiliser les formulaires réactifs et les directives de formulaire
    ReactiveFormsModule, // Nécessaire pour utiliser les formulaires réactifs
  ],
  providers: [
    CurrencyPipe, // Optionel: Si on souhaite utiliser le CurrencyPipe dans le composant.ts car il n'est pas injecté par défaut et il est possible de l'utiliser directement dans le template HTML grace au CommonModule
    HttpClient // Nécessaire pour effectuer des requêtes HTTP
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  amount: number = 10.56;
  public hunts: HuntModel[] | undefined; // Liste des chasses au trésor

  //private readonly huntService = inject(HuntsService);
  
  constructor(
    private currencyPipe: CurrencyPipe, 
    private huntService: HuntsService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.getHunts(); // Récupération de la liste des chasses au trésor depuis le service
  }

  formatCurrency(value: number): string {
    return this.currencyPipe.transform(value, 'USD', 'symbol', '1.0-0') || '';
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  formatTime(date: Date): string {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }

  formatDateTime(date: Date): string {
    return `${this.formatDate(date)} ${this.formatTime(date)}`;
  }

  public parseIsoDateTime(isoString: string, forTime: string =''): string {
    const date = parseIsoDateTime(isoString, forTime);
    return date;
  }

  private getHunts() : void{
    this.huntService.getAll().subscribe({
      next: data => this.hunts = data,
      error: err => console.error('Error fetching hunts:', err)
    });
  }

  public goToHuntDetail(id: number): void {
    this.router.navigate(['/hunt/'+id])
  }

}
