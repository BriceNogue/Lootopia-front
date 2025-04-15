//#region Imports
//#region Directives
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
//#endregion Directives

//#region Moduls
import { CommonModule } from '@angular/common';
//#endregion Moduls

//#region Components
import { HeaderComponent } from './shareds/header/header.component';
import { FooterComponent } from './shareds/footer/footer.component';
//#endregion Components
//#endregion Imports

@Component({
  selector: 'app-root',
  imports: [
    //#region Directives
    RouterOutlet,
    //#endregion Directives

    //#region Moduls
    CommonModule,
    //#endregion Moduls

    //#region Components
    HeaderComponent,
    FooterComponent
    //#endregion Components
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'lootopia-front';
  loading$ = new BehaviorSubject<boolean>(false);

  constructor(private router: Router) {
    setTimeout(() => this.loading$.next(true), 1000); // Show loading after 1 second
    setTimeout(() => this.loading$.next(false), 3000); // Hide loading after 3 seconds
  }

  ngOnInit() {
    this.router.navigate(['/landing']);
  }

  ngOnDestroy() {
    
  }

  ngAfterViewInit() {
    
  }
}
