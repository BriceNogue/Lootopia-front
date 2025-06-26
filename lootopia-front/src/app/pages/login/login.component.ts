import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, HttpClientModule]
})
export class LoginComponent implements OnInit {
  // Formulaire de connexion
  loginForm: FormGroup;
  // État de chargement
  isLoading: boolean = false;
  // Message d'erreur
  errorMessage: string = '';
  // État de succès
  showSuccess: boolean = false;
  welcomeMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {
    // Initialisation du formulaire avec les validateurs
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit() {
    // Surveillance des changements du formulaire pour réinitialiser les messages d'erreur
    this.loginForm.valueChanges.subscribe(() => {
      this.errorMessage = '';
    });
  }

  // Validation de l'email
  validateEmail() {
    const email = this.loginForm.get('email');
    if (email?.errors) {
      if (email.errors['required']) {
        return 'L\'email est requis';
      } else if (email.errors['email']) {
        return 'Veuillez entrer une adresse email valide';
      }
    }
    return '';
  }

  // Gestion de la soumission du formulaire
  async onSubmit() {
    console.log('Formulaire soumis', this.loginForm.value);
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      try {
        // Simulation d'un appel API pour la vérification du profil
        const userExists = await this.checkUserExists(this.loginForm.value);
        
        if (userExists) {
          // Affichage du message de succès
          this.showSuccess = true;
          
          // Simulation de la connexion
          await this.loginUser(this.loginForm.value);
          
          // Redirection vers la landing page après 2 secondes
          setTimeout(() => {
            this.router.navigate(['/landing']);
          }, 2000);
        } else {
          this.errorMessage = 'Email ou mot de passe incorrect';
        }
      } catch (error) {
        console.error('Erreur lors de la connexion:', error);
        this.errorMessage = 'Une erreur est survenue lors de la connexion';
      } finally {
        this.isLoading = false;
      }
    } else {
      // Affichage des erreurs pour tous les champs
      Object.keys(this.loginForm.controls).forEach(key => {
        const control = this.loginForm.get(key);
        control?.markAsTouched();
      });
    }
  }

  // Simulation de la vérification de l'existence du profil
  private async checkUserExists(credentials: any): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulation de la vérification (à remplacer par un vrai appel API)
        console.log('Vérification du profil:', credentials);
        // Pour le test, on considère que le profil existe si l'email contient '@'
        const exists = credentials.email.includes('@');
        console.log('Profil existe:', exists);
        resolve(exists);
      }, 1000);
    });
  }

  // Simulation de la connexion
  private async loginUser(credentials: any): Promise<void> {
    try {
      const response: any = await this.http.post('https://lootopia-backend.onrender.com/api/user/login', {
        mail: credentials.email,
        password: credentials.password
      }).toPromise();
      console.log('Réponse API login:', response);
      if (response && response.token) {
        const decoded: any = jwtDecode(response.token);
        this.welcomeMessage = `Bienvenue ${decoded.username || decoded.pseudo || ''} !`;
        localStorage.setItem('token', response.token);
      } else if (response && response.username) {
        this.welcomeMessage = `Bienvenue ${response.username} !`;
      }
      this.showSuccess = true;
      setTimeout(() => {
        this.welcomeMessage = '';
        this.router.navigate(['/landing']);
      }, 2000);
    } catch (error: any) {
      console.error('Erreur lors de la connexion:', error);
      this.errorMessage = error?.error?.message || 'Une erreur est survenue lors de la connexion';
      throw error;
    }
  }

  // Navigation vers la page d'inscription
  goToRegister() {
    this.router.navigate(['/register']);
  }

  // Navigation vers la page de mot de passe oublié
  goToForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }
}
  