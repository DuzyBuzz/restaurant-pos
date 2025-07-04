import { Routes } from '@angular/router';
import { usersRoutes } from './users/users.routes';
import { authRoutes } from './auth/auth.routes';
import { sharedRoutes } from './shared/shared.routes';

export const routes: Routes = [
  ...authRoutes,
  ...usersRoutes,
  ...sharedRoutes,
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  }
];
