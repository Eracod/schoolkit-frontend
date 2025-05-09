import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FormFieldComponent } from '@shared/components/forms/form-field/form-field.component';
import { SvgIconComponent } from '@shared/components/svg-icon/svg-icon.component';

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
    email: new FormControl('', [Validators.required]),
  });
  currentView: VerificationViews = VerificationViews.Main;
  VerificationView = VerificationViews;

  setView(view: VerificationViews) {
    this.currentView = view;
  }

  onEmailSignup() {
    this.setView(VerificationViews.EmailVerification);
  }

  verifyEmail() {
    if (this.emailForm.invalid) {
      this.emailForm.markAllAsTouched();
      return;
    }

    const email = this.emailForm.get('email')?.value;
    if (!email) return;
    this.emailVerified.emit(email);
  }
}
