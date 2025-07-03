    import { Routes } from '@angular/router';
    import { LandingComponent } from './pages/landing/landing.component';
    import { DashboardComponent } from './pages/dashboard/dashboard.component';
    import { RegisterComponent } from './pages/register/register.component';
    import { LoginComponent } from './pages/login/login.component';
    import { HuntDetailsComponent } from './pages/hunt-details/hunt-details.component';
    import { UserProfilComponent } from './pages/user-profil/user-profil.component';
    import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
    import { NotFoundComponent } from './pages/not-found/not-found.component';
    import { DashboardAdminComponent } from './pages/admin/dashboard-admin/dashboard-admin.component';
import { EditHuntComponent } from './pages/edit-hunt/edit-hunt.component';

    export const routes: Routes = [
        {
            path: '404',
            component: NotFoundComponent
        },
        {
            path: 'landing',
            component: LandingComponent,
            data: {
                title: 'Landing',
                breadcrumb: 'Landing'
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
            path: 'user-profile',
            component: UserProfilComponent
        },
        {
            path: 'dashboard',
            component: DashboardComponent
        },
        {
            path: 'hunt/:id',
            component: HuntDetailsComponent
        },
        {
            path: 'hunt/edit/:id',
            component: EditHuntComponent
        },
        {
            path: 'admin',
            component: DashboardAdminComponent
        },
        {
            path: '',
            redirectTo: 'landing',
            pathMatch: 'full'
        },
        {
            path: '**',
            component: NotFoundComponent
        }
    ];
