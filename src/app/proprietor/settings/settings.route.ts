import { Routes } from '@angular/router';

export const SettingRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },
  {
    path: 'personal-information',
    title: 'Personal information - Settings',
    loadComponent: () =>
      import(
        './pages/personal-information/personal-information.component'
      ).then((m) => m.PersonalInformationComponent),
  },
  {
    path: 'payments',
    title: 'Payment - Settings',
    loadComponent: () =>
      import('./pages/payments/payments.component').then(
        (m) => m.PaymentsComponent
      ),
  },
  {
    path: 'security',
    title: 'Security - Settings',
    loadComponent: () =>
      import('./pages/security/security.component').then(
        (m) => m.SecurityComponent
      ),
  },
  {
    path: 'notifications',
    title: 'Notifications - Settings',
    loadComponent: () =>
      import('./pages/notifications/notifications.component').then(
        (m) => m.NotificationsComponent
      ),
  },
];
