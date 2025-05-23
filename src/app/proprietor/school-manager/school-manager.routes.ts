import { Routes } from '@angular/router';

export const SchoolManagerRoutes: Routes = [
  {
    path: '',
    title: 'School - Sessions',
    data: { description: 'Manage school sessions' },
    loadComponent: () =>
      import('./sessions/sessions.component').then((m) => m.SessionsComponent),
  },
  {
    path: 'classes',
    title: 'School - Classes',
    data: { description: 'Manage school classes' },
    loadComponent: () =>
      import('./classrooms/classrooms.component').then(
        (m) => m.ClassroomsComponent
      ),
  },
  {
    path: 'subjects',
    title: 'School - Subjects',
    data: {
      description: 'Manage school subjects offered by each student in a class',
    },
    loadComponent: () =>
      import('./subjects/subjects.component').then((m) => m.SubjectsComponent),
  },
];
