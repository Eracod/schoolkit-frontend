import { Component, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { AvatarComponent } from '@shared/components/avatar/avatar.component';
import { AuthUser } from '@shared/models/auth';
import { selectCurrentUser } from '@store/auth';
import { SvgIconComponent } from '@shared/components/svg-icon/svg-icon.component';
import { FormFieldComponent } from '@shared/components/forms/form-field/form-field.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-personal-information',
  imports: [AvatarComponent, SvgIconComponent, FormFieldComponent],
  templateUrl: './personal-information.component.html',
  styleUrl: './personal-information.component.scss',
})
export class PersonalInformationComponent {
  public currentUser: Signal<AuthUser | null>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly store: Store
  ) {
    this.currentUser = this.store.selectSignal(selectCurrentUser);
  }

  goBack() {
    this.router.navigate(['..'], {
      relativeTo: this.route,
    });
  }
}
