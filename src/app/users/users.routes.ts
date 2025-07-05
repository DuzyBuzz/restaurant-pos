import { Routes } from '@angular/router';

export const usersRoutes: Routes = [
  {
    path: 'users',
    loadComponent: () => import('./users.page').then(m => m.UsersPage),
    children: [
      {
        path: 'cashier-pos',
        loadComponent: () => import('./pages/cashier-pos/cashier-pos.page').then(m => m.CashierPosPage)
      },
      {
        path: 'crud',
        loadComponent: () => import('./pages/crud/crud.page').then(m => m.CrudPage)
      },
      {
        path: '',
        redirectTo: 'cashier-pos',
        pathMatch: 'full'
      }
      
    ]
  }
];