import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FormFieldComponent } from '@shared/components/forms/form-field/form-field.component';
import { SvgIconComponent } from '@shared/components/svg-icon/svg-icon.component';
import { AuthService } from '@shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';

enum VerificationViews {
  Main,
  EmailVerification,
}

@Component({
  selector: 'app-email-verification',
  imports: [
    FormFieldComponent,
    SvgIconComponent,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './email-verification.component.html',
  styleUrl: './email-verification.component.scss',
})
export class EmailVerificationComponent {
  @Output() emailVerified = new EventEmitter<string>();

  public emailForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  currentView: VerificationViews = VerificationViews.Main;
  VerificationView = VerificationViews;
  processing = false;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly toastr: ToastrService
  ) {}

  setView(view: VerificationViews) {
    this.currentView = view;
  }

  onEmailSignup() {
    this.setView(VerificationViews.EmailVerification);
  }

  verifyEmail() {
    if (this.processing) return;
    if (this.emailForm.invalid) {
      this.emailForm.markAllAsTouched();
      return;
    }

    const email = this.emailForm.get('email')?.value;
    if (!email) return;

    this.processing = true;
    this.authService.verifyEmail(email).subscribe({
      next: (response) => {
        this.processing = false;
        if (response.data.exists) {
          this.router.navigateByUrl('/');
          return;
        }
        this.emailVerified.emit(email);
      },
      error: (error) => {
        this.processing = false;
        this.toastr.error(error.error.message);
      },
    });
  }
}
