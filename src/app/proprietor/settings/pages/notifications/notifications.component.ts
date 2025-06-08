import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormSwitchComponent } from '@shared/components/forms/form-switch/form-switch.component';
import { SvgIconComponent } from '@shared/components/svg-icon/svg-icon.component';

@Component({
  selector: 'app-notifications',
  imports: [SvgIconComponent, FormSwitchComponent],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss',
})
export class NotificationsComponent {
  public notifications: {
    title: string;
    description: string;
    methods: { name: 'App' | 'Email' | 'SMS'; enabled: boolean }[];
  }[] = [
    {
      title: 'Staff',
      description:
        'Receive notifications when you have a new staff registration, delete activity, uploads etc.',
      methods: [
        {
          name: 'App',
          enabled: false,
        },
        {
          name: 'Email',
          enabled: false,
        },
        {
          name: 'SMS',
          enabled: false,
        },
      ],
    },
    {
      title: 'Student',
      description:
        'Receive notifications when you have a new student registration, delete activity, uploads etc.',
      methods: [
        {
          name: 'App',
          enabled: false,
        },
        {
          name: 'Email',
          enabled: false,
        },
        {
          name: 'SMS',
          enabled: false,
        },
      ],
    },
    {
      title: 'Payment',
      description: 'Receive notifications when you have a new payment creation',
      methods: [
        {
          name: 'App',
          enabled: false,
        },
        {
          name: 'Email',
          enabled: false,
        },
        {
          name: 'SMS',
          enabled: false,
        },
      ],
    },
    {
      title: 'Session',
      description:
        'Receive notifications when you have a new session creation, edits etc.',
      methods: [
        {
          name: 'App',
          enabled: false,
        },
        {
          name: 'Email',
          enabled: false,
        },
        {
          name: 'SMS',
          enabled: false,
        },
      ],
    },
    {
      title: 'Class',
      description:
        'Receive notifications when you have a new class creation, and other activities.',
      methods: [
        {
          name: 'App',
          enabled: false,
        },
        {
          name: 'Email',
          enabled: false,
        },
        {
          name: 'SMS',
          enabled: false,
        },
      ],
    },
    {
      title: 'Subject',
      description:
        'Receive notifications when you have a new subject creation and other activities etc.',
      methods: [
        {
          name: 'App',
          enabled: false,
        },
        {
          name: 'Email',
          enabled: false,
        },
        {
          name: 'SMS',
          enabled: false,
        },
      ],
    },
  ];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  goBack() {
    this.router.navigate(['..'], {
      relativeTo: this.route,
    });
  }
}
