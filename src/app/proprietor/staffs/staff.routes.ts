import { Routes } from '@angular/router';

export const StaffRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
    title: 'Staffs - SchoolKit',
    data: { description: 'Staffs dashboard overview' },
  },
];
