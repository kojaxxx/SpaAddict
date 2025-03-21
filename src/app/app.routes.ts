import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/admin/login/login.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { 
    path: 'admin', 
    loadChildren: () => import('./pages/admin/admin.routes').then(m => m.ADMIN_ROUTES),
    canActivate: [authGuard] 
  },
  { path: '**', redirectTo: '/' }
];