import { Routes } from '@angular/router';

export const StudentRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
    title: 'Students - SchoolKit',
    data: { description: 'Students manager dashboard overview' },
  },
];
