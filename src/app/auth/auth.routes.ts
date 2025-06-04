import { Routes } from '@angular/router';

export const AuthRoutes: Routes = [
  {
    path: '',
    title: 'Login',
    data: { description: 'Login to your account' },
    loadComponent: () =>
      import('./login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'signup',
    title: 'Signup',
    data: { description: 'Create an account' },
    loadComponent: () =>
      import('./signup/signup.component').then((m) => m.SignupComponent),
  },
  {
    path: 'confirm-email',
    title: 'Confirm Email',
    data: { description: 'Confirm account email' },
    loadComponent: () =>
      import('./confirm-email/confirm-email.component').then(
        (m) => m.ConfirmEmailComponent
      ),
  },
];
