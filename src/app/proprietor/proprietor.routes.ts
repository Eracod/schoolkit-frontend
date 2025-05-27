import { Routes } from '@angular/router';
import { SchoolManagerRoutes } from './school-manager/school-manager.routes';
import { StaffRoutes } from './staffs/staff.routes';

export const ProprietorRoutes: Routes = [
  {
    path: '',
    title: 'Dashboard',
    data: { description: 'Dashboard overview' },
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(
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
      import('./create-institution/create-institution.component').then(
        (m) => m.CreateInstitutionComponent
      ),
  },
  {
    path: 'school-manager',
    title: 'School Management',
    data: {
      description: 'Manage schools within your institution',
    },
    loadComponent: () =>
      import('./school-manager/school-manager.component').then(
        (m) => m.SchoolManagerComponent
      ),
    children: SchoolManagerRoutes,
  },
  {
    path: 'staffs',
    title: 'Staff Management',
    data: {
      description: 'Manage staff members within your institution',
    },
    loadComponent: () =>
      import('./staffs/staffs.component').then((m) => m.StaffsComponent),
    children: StaffRoutes,
  },
];
