import { Routes } from '@angular/router';
import { AuthRoutes } from './auth/auth.routes';
import { ProprietorRoutes } from './proprietor/proprietor.routes';

export const routes: Routes = [
  { path: '', children: AuthRoutes },
  { path: 'proprietor', children: ProprietorRoutes },
];
