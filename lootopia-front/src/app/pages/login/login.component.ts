import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

<<<<<<< Updated upstream
=======
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
    // Réinitialise les messages d'erreur à chaque changement du formulaire
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

  // Gestion de la soumission du formulaire de login
  async onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      try {
        // 1. Appel API de login (POST)
        const loginResponse: any = await this.http.post('https://lootopia-backend.onrender.com/api/user/login', {
          mail: this.loginForm.value.email,
          password: this.loginForm.value.password
        }).toPromise();

        // 2. Stockage du token dans le localStorage
        if (loginResponse && loginResponse.access_token) {
          localStorage.setItem('access_token', loginResponse.access_token);
        }
        if (loginResponse && loginResponse.refresh_token) {
          localStorage.setItem('refresh_token', loginResponse.refresh_token);
        }

        // 3. Décodage du token pour récupérer l'ID utilisateur
        let userId: string | undefined;
        if (loginResponse && loginResponse.access_token) {
          const decoded: any = jwtDecode(loginResponse.access_token);
          userId = decoded.id || decoded._id || decoded.user_id;
          console.log('Token décodé:', decoded);
          console.log('userId utilisé:', userId);
          if (userId) {
            localStorage.setItem('userId', userId);
          }
        }

        // 4. Vérification de l'existence de l'utilisateur via un GET
        if (userId) {
          const user = await this.http.get<{ username?: string; pseudo?: string }>(`https://lootopia-backend.onrender.com/api/user/${userId}/`).toPromise();
          // Si l'utilisateur existe, accès autorisé
          this.showSuccess = true;
          this.welcomeMessage = `Bienvenue ${user && (user.username || user.pseudo || '')} !`;
          setTimeout(() => {
            this.router.navigate(['/landing']);
          }, 2000);
        } else {
          // Si pas d'ID utilisateur, erreur
          this.errorMessage = "Impossible de récupérer l'utilisateur.";
        }
      } catch (error: any) {
        // Gestion des erreurs (login ou GET user)
        this.errorMessage = error?.error?.message || "Email ou mot de passe incorrect";
      } finally {
        this.isLoading = false;
      }
    } else {
      // Affiche les erreurs pour tous les champs invalides
      Object.keys(this.loginForm.controls).forEach(key => {
        const control = this.loginForm.get(key);
        control?.markAsTouched();
      });
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
>>>>>>> Stashed changes
}
