import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
];
