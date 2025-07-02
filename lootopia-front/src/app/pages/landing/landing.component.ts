import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from '../../models/user.model';
import { getCurentUser } from '../../utils/common';

@Component({
  selector: 'app-landing',
  imports: [],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent implements OnInit {
  private readonly router = inject(Router);
  public curentUser: UserModel | null = null;

  ngOnInit() {
    this.getCurentUser();
  }

  onLoginClick() {
    this.router.navigate(['/login']);
  }

  getCurentUser() {
    const user = getCurentUser();
    if (user) {
      this.curentUser = user;
    } else {
      this.curentUser = null;
      this.onLoginClick();
    }
  }
}
