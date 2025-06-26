import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  submitted = false;
  errorMessage = '';

  constructor(private fb: FormBuilder) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')
      ]]
    });
  }

  get f() {
    return this.forgotPasswordForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.errorMessage = '';

    if (this.forgotPasswordForm.invalid) {
      return;
    }

    // TODO: Implémenter la logique de réinitialisation du mot de passe
    console.log('Email soumis:', this.forgotPasswordForm.value.email);
  }

  getErrorMessage(controlName: string): string {
    const control = this.f[controlName];
    if (control.hasError('required')) {
      return 'Ce champ est requis';
    }
    if (control.hasError('email') || control.hasError('pattern')) {
      return 'Veuillez entrer une adresse email valide';
    }
    return '';
  }
}
