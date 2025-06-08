import { Component, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthUser } from '@shared/models/auth';
import { selectCurrentUser } from '@store/auth';
import { AvatarComponent } from '@shared/components/avatar/avatar.component';
import { IconDefinitions } from '@shared/components/svg-icon/models';
import { SvgIconComponent } from '../../../../shared/components/svg-icon/svg-icon.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [AvatarComponent, SvgIconComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  public currentUser: Signal<AuthUser | null>;
  public settings: {
    title: string;
    description: string;
    icon: IconDefinitions;
    route: string;
  }[] = [
    {
      title: 'Personal Info',
      description: 'Provide personal details and how we can reach you',
      icon: 'user-id',
      route: 'personal-information',
    },
    {
      title: 'Security and Login',
      description: 'Update your password and secure your account',
      icon: 'shield',
      route: 'security',
    },
    {
      title: 'Payments & payouts',
      description: 'Review payments and payouts account',
      icon: 'tickets',
      route: 'payments',
    },
    {
      title: 'Notifications',
      description:
        'Choose notification preferences and how you want to be contacted',
      icon: 'mega-phone',
      route: 'notifications',
    },
  ];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly store: Store
  ) {
    this.currentUser = this.store.selectSignal(selectCurrentUser);
  }

  goto(url: string) {
    this.router.navigate([url], { relativeTo: this.route });
  }
}
