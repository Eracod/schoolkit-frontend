import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FormFieldComponent } from '@shared/components/forms/form-field/form-field.component';
import { IconDefinitions } from '@shared/components/svg-icon/models';
import { SvgIconComponent } from '@shared/components/svg-icon/svg-icon.component';

@Component({
  selector: 'app-login',
  imports: [
    FormFieldComponent,
    SvgIconComponent,
    ReactiveFormsModule,
    RouterLink,
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

  constructor() {}

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
}
