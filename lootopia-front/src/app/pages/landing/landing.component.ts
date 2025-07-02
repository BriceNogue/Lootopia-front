<<<<<<< Updated upstream
import { Component } from '@angular/core';
=======
import { Component, inject, AfterViewInit, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleMapsModule } from '@angular/google-maps';
import { HuntsService } from '../../services/hunts.service';
import { GetHuntModel } from '../../models/hunt.model';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
>>>>>>> Stashed changes

@Component({
  selector: 'app-landing',
  imports: [CommonModule, DatePipe, HttpClientModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
<<<<<<< Updated upstream
export class LandingComponent {

=======
export class LandingComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly huntsService = inject(HuntsService);

  // Liste des chasses autour de Nantes à afficher
  public nantesHunts: GetHuntModel[] = [];
  public isLoadingHunts = true;
  public huntsError = '';
  public faqOpen: boolean[] = [false, false, false];

  ngOnInit(): void {
    // Récupère toutes les chasses et filtre celles autour de Nantes
    this.huntsService.getAll().subscribe({
      next: (hunts) => {
        this.nantesHunts = (hunts || []).filter(hunt => hunt.lieu && hunt.lieu.toLowerCase().includes('nantes'));
        this.isLoadingHunts = false;
      },
      error: (err) => {
        this.huntsError = 'Erreur lors du chargement des chasses.';
        this.isLoadingHunts = false;
      }
    });
  }

  /**
   * Navigue vers la page de connexion lors du clic sur le bouton.
   */
  onLoginClick() {
    this.router.navigate(['/login']);
  }

  /**
   * Ouvre ou ferme une question de la FAQ
   */
  toggleFaq(index: number) {
    this.faqOpen[index] = !this.faqOpen[index];
    // Ferme les autres questions (FAQ accordéon)
    this.faqOpen = this.faqOpen.map((open, i) => i === index ? this.faqOpen[index] : false);
  }
>>>>>>> Stashed changes
}
