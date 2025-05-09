import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Login',
    data: { description: 'Login to your account' },
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'signup',
    title: 'Signup',
    data: { description: 'Create an account' },
    loadComponent: () =>
      import('./pages/signup/signup.component').then((m) => m.SignupComponent),
  },
];
