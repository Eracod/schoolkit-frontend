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
  {
    path: 'dashboard',
    title: 'Dashboard',
    data: { description: 'Dashboard overview' },
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },
  {
    path: 'create-institution',
    title: 'Create Institution',
    data: {
      description: 'Create an institution that will then be added schools',
    },
    loadComponent: () =>
      import(
        './pages/institution/create-institution/create-institution.component'
      ).then((m) => m.CreateInstitutionComponent),
  },
];
