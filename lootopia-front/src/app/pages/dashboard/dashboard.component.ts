import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

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
  
  constructor(private currencyPipe: CurrencyPipe) {}

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
}
