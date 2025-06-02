import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FormFieldComponent } from '@shared/components/forms/form-field/form-field.component';
import { LoaderComponent } from '@shared/components/loader/loader.component';
import { IconDefinitions } from '@shared/components/svg-icon/models';
import { SvgIconComponent } from '@shared/components/svg-icon/svg-icon.component';
import { LoginRequest } from '@shared/models/auth';
import { AuthService } from '@shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [
    FormFieldComponent,
    SvgIconComponent,
    ReactiveFormsModule,
    RouterLink,
    LoaderComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  public passwordType: 'password' | 'text' = 'password';
  public processing = false;

  constructor(
    private readonly authService: AuthService,
    private readonly toastr: ToastrService
  ) {}

  get passwordIcon(): IconDefinitions {
    return this.passwordType === 'password' ? 'eye' : 'eye-slash';
  }

  get fc() {
    return this.loginForm.controls;
  }

  toggleMode() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }

  clear(control: FormControl<any>) {
    control.patchValue('');
  }

  login() {
    if (this.processing) return;
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const request: LoginRequest = {
      password: this.fc.password.value!,
      email: this.fc.email.value!,
    };

    this.processing = true;
    this.authService.login(request).subscribe({
      next: (response) => {
        console.log(response);
        this.processing = false;
      },
      error: (error: HttpErrorResponse) => {
        this.processing = false;
        this.toastr.error(
          error.error?.message || error.message,
          'Login failed'
        );
      },
    });
  }
}
