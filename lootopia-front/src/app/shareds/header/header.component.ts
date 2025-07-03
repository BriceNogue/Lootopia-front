import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserModel } from '../../models/user.model';
import { getCurentUserId } from '../../utils/common';
import { UsersService } from '../../services/users.service';
 
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  isMenuOpen = false;
  public hasUser = false;
  private readonly router = inject(Router);
  public curentUser: UserModel | null = null;
  private curentUserId: number | null = null;

  constructor(
    private readonly userService: UsersService
  ) {}

  ngOnInit() {
    this.getCurentUser();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  logOut() {
    localStorage.removeItem('userId');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.hasUser = false;
    this.router.navigate(['/landing']);
  }

  getCurentUser() {
    const userId = getCurentUserId();
    if (userId) {
      this.hasUser = true;
      this.curentUserId = userId;
      this.userService.getById(userId).subscribe({
        next: (user) => { this.curentUser = user; },
        error: (err) => { console.error('Erreur lors de la récupération de l\'utilisateur :', err); }
      });
    } else {
      this.curentUserId = null;
      this.curentUser = null;
      this.hasUser = false;
    }
  }
}
