import { Routes } from '@angular/router';
import { AuthRoutes } from './auth/auth.routes';
import { ProprietorRoutes } from './proprietor/proprietor.routes';
import { authGuard } from '@shared/guards/auth.guard';

export const routes: Routes = [
  { path: '', children: AuthRoutes },
  { path: 'proprietor', children: ProprietorRoutes, canActivate: [authGuard] },
];
