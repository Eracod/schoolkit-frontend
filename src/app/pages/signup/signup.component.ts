import { Component } from '@angular/core';
import { EmailVerificationComponent } from './components/email-verification/email-verification.component';
import { SignupWizardComponent } from './components/signup-wizard/signup-wizard.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [EmailVerificationComponent, SignupWizardComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  public isEmailVerified = false;
  public email = '';

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.email = this.activatedRoute.snapshot.queryParams['email'];
    this.isEmailVerified = !!this.email;
  }

  onEmailVerified(email: string) {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { email },
      queryParamsHandling: 'merge',
    });
    this.isEmailVerified = true;
  }
}
