import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  submitted = false;
  errorMessage = '';
  successMessage = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordsMatchValidator });
  }

  passwordsMatchValidator(form: FormGroup) {
    const password = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  get f() {
    return this.forgotPasswordForm.controls;
  }

  async onSubmit() {
    this.submitted = true;
    this.errorMessage = '';
    this.successMessage = '';

    if (this.forgotPasswordForm.invalid) {
      if (this.forgotPasswordForm.errors && this.forgotPasswordForm.errors['passwordMismatch']) {
        this.errorMessage = 'Les mots de passe ne correspondent pas.';
      }
      return;
    }

    const email = this.forgotPasswordForm.value.email;
    const newPassword = this.forgotPasswordForm.value.newPassword;

    // 1. Récupérer l'utilisateur par email
    let userId: string | number | undefined;
    let pseudo: string | undefined;
    let role_id: number | undefined;
    try {
      const users: any = await this.http.get('https://lootopia-backend.onrender.com/api/user/').toPromise();
      const user = Array.isArray(users) ? users.find((u: any) => u.mail === email) : null;
      if (!user) {
        this.errorMessage = 'Aucun utilisateur trouvé avec cet email.';
        return;
      }
      userId = user.id;
      pseudo = user.pseudo;
      role_id = user.role_id || 1;
    } catch (e) {
      this.errorMessage = 'Erreur lors de la recherche de l\'utilisateur.';
      return;
    }

    // 2. Appel API pour modifier le mot de passe
    try {
      const res = await this.http.put(
        `https://lootopia-backend.onrender.com/api/user/${userId}/edit/`,
        {
          pseudo: pseudo || 'pseudo',
          mail: email,
          password: newPassword,
          role_id: role_id
        }
      ).toPromise();
      this.successMessage = 'Mot de passe modifié avec succès !';
      this.forgotPasswordForm.reset();
      this.submitted = false;
      console.log('Réponse API reset password:', res);
    } catch (error) {
      this.errorMessage = 'Erreur lors de la modification du mot de passe.';
      console.error('Erreur API reset password:', error);
    }
  }

  getErrorMessage(controlName: string): string {
    const control = this.f[controlName];
    if (control.hasError('required')) {
      return 'Ce champ est requis';
    }
    if (controlName === 'newPassword' && control.hasError('minlength')) {
      return 'Le mot de passe doit contenir au moins 8 caractères';
    }
    if (controlName === 'confirmPassword' && this.forgotPasswordForm.errors && this.forgotPasswordForm.errors['passwordMismatch']) {
      return 'Les mots de passe ne correspondent pas.';
    }
    return '';
  }
}
