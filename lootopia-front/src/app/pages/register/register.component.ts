import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  passwordError: string = '';
  emailError: string = '';
  showSuccess: boolean = false;
  passwordRequirements = {
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false
  };

  constructor(
    private router: Router,
    private fb: FormBuilder
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      ]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.registerForm.get('password')?.valueChanges.subscribe(value => {
      this.checkPasswordRequirements(value);
    });

    this.registerForm.get('confirmPassword')?.valueChanges.subscribe(() => {
      this.checkPasswordMatch();
    });
  }

  checkPasswordRequirements(password: string) {
    this.passwordRequirements = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[@$!%*?&]/.test(password)
    };
  }

  checkPasswordMatch() {
    const password = this.registerForm.get('password')?.value;
    const confirmPassword = this.registerForm.get('confirmPassword')?.value;
    
    if (password && confirmPassword && password !== confirmPassword) {
      this.registerForm.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    } else {
      this.registerForm.get('confirmPassword')?.setErrors(null);
    }
  }

  validatePassword() {
    const password = this.registerForm.get('password');
    if (password?.errors) {
      if (password.errors['required']) {
        this.passwordError = 'Le mot de passe est requis';
      } else if (password.errors['minlength']) {
        this.passwordError = 'Le mot de passe doit contenir au moins 8 caractères';
      } else if (password.errors['pattern']) {
        this.passwordError = 'Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial';
      }
    } else {
      this.passwordError = '';
    }
  }

  validateEmail() {
    const email = this.registerForm.get('email');
    if (email?.errors) {
      if (email.errors['required']) {
        this.emailError = 'L\'email est requis';
      } else if (email.errors['email']) {
        this.emailError = 'Veuillez entrer une adresse email valide';
      }
    } else {
      this.emailError = '';
    }
  }

  async onSubmit() {
    if (this.registerForm.valid) {
      try {
        await this.registerUser(this.registerForm.value);
        
        this.showSuccess = true;
        
        setTimeout(() => {
          this.router.navigate(['/landing']);
        }, 2000);
      } catch (error) {
        console.error('Erreur lors de l\'inscription:', error);
      }
    } else {
      Object.keys(this.registerForm.controls).forEach(key => {
        const control = this.registerForm.get(key);
        control?.markAsTouched();
      });
    }
  }

  private async registerUser(userData: any): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Données d\'inscription:', userData);
        resolve();
      }, 1000);
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
