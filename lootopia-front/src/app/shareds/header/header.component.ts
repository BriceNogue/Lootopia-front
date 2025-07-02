import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserModel } from '../../models/user.model';
import { getCurentUser } from '../../utils/common';
 
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
    localStorage.removeItem('user');
    this.hasUser = false;
    this.router.navigate(['/landing']);
  }

  getCurentUser() {
    const user = getCurentUser();
    if (user) {
      this.hasUser = true;
      this.curentUser = user;
    } else {
      this.curentUser = null;
      this.hasUser = false;
    }
  }
}
