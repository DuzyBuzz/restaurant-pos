import { Routes } from '@angular/router';

export const sharedRoutes: Routes = [
  {
    path: 'navbar',
    loadComponent: () => import('./core/navbar/navbar.page').then(m => m.NavbarPage)
  }
];