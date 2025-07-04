import { Routes } from '@angular/router';

export const usersRoutes: Routes = [
  {
    path: 'users',
    loadComponent: () => import('./users.page').then(m => m.UsersPage),
    children: [
      {
        path: 'home',
        loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage)
      },
      {
        path: 'crud',
        loadComponent: () => import('./pages/crud/crud.page').then(m => m.CrudPage)
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  }
];