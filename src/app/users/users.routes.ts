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
        path: 'sales',
        loadComponent: () => import('./pages/sales/sales.page').then(m => m.SalesPage)
      },      
      {
        path: 'inventory',
        loadComponent: () => import('./pages/inventory/inventory.page').then(m => m.InventoryPage)
      },
      {
        path: 'settings',
        loadComponent: () => import('./pages/settings/settings.page').then(m => m.SettingsPage)
      },
      {
        path: 'system-info',
        loadComponent: () => import('./pages/system-info/system-info.page').then(m => m.SystemInfoPage)
      },
      {
        path: '',
        redirectTo: 'cashier-pos',
        pathMatch: 'full'
      }
      
    ]
  }
];