import { Routes } from '@angular/router';
import { SchoolManagerRoutes } from './school-manager/school-manager.routes';
import { StaffRoutes } from './staffs/staff.routes';
import { StudentRoutes } from './students/student.routes';
import { SettingRoutes } from './settings/settings.route';

export const ProprietorRoutes: Routes = [
  {
    path: '',
    title: 'Dashboard - SchoolKit',
    data: { description: 'Dashboard overview' },
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },
  {
    path: 'create-institution',
    title: 'Create Institution - SchoolKit',
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
    title: 'School Management - SchoolKit',
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
      description: 'Manage staff members in your institution',
    },
    loadComponent: () =>
      import('./staffs/staffs.component').then((m) => m.StaffsComponent),
    children: StaffRoutes,
  },
  {
    path: 'students',
    title: 'Student Management',
    data: {
      description: 'Manage students in your school',
    },
    loadComponent: () =>
      import('./students/students.component').then((m) => m.StudentsComponent),
    children: StudentRoutes,
  },
  {
    path: 'settings',
    title: 'Account Settings - SchoolKit',
    data: {
      description: 'Manage your account settings',
    },
    loadComponent: () =>
      import('./settings/settings.component').then((m) => m.SettingsComponent),
    children: SettingRoutes,
  },
];
