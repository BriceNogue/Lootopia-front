import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { HuntDetailsComponent } from './pages/hunt-details/hunt-details.component';
import { UserProfilComponent } from './pages/user-profil/user-profil.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';

export const routes: Routes = [
    {
        path: 'landing',
        component: LandingComponent,
        data: {
            title: 'Landing',
            breadcrumb: 'Landing' // Pour le fil d'Ariane
        }
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent
    },
    {
        path: 'user-profile/:id',
        component: UserProfilComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'hunt-details/:id',
        component: HuntDetailsComponent
    },
    {
        path: 'not-found',
        component: NotfoundComponent
    },
    {
        path: '',
        redirectTo: 'landing',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'not-found',
        pathMatch: 'full'
    }
];
