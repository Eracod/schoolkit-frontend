import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { FormFieldComponent } from '@shared/components/forms/form-field/form-field.component';
import { SvgIconComponent } from '@shared/components/svg-icon/svg-icon.component';
import {
  GetLowerCaseValidatorPattern,
  LowerCaseValidator,
} from '@shared/validators/lowercase.validator';
import {
  GetNumberValidatorPattern,
  NumberValidator,
} from '@shared/validators/number.validator';
import {
  GetSpecialCharacterValidatorPattern,
  SpecialCharacterValidator,
} from '@shared/validators/special-character.validator';
import {
  GetUpperCaseValidatorPattern,
  UpperCaseValidator,
} from '@shared/validators/uppercase.validator';

const NumberValidatorPattern = GetNumberValidatorPattern({ min: 1 });
const UpperCaseValidatorPattern = GetUpperCaseValidatorPattern({ min: 1 });
const LowerCaseValidatorPattern = GetLowerCaseValidatorPattern({ min: 1 });
const SpecialCharacterValidatorPattern = GetSpecialCharacterValidatorPattern({
  min: 1,
});

@Component({
  selector: 'app-create-password',
  imports: [
    ReactiveFormsModule,
    FormFieldComponent,
    NgbProgressbarModule,
    SvgIconComponent,
  ],
  templateUrl: './create-password.component.html',
  styleUrl: './create-password.component.scss',
})
export class CreatePasswordComponent {
  public passwordForm = new FormGroup({
    password: new FormControl('', [
      NumberValidator({ min: 1 }),
      UpperCaseValidator({ min: 1 }),
      LowerCaseValidator({ min: 1 }),
      SpecialCharacterValidator({ min: 1 }),
      Validators.minLength(8),
      Validators.required,
    ]),
    confirmPassword: new FormControl(''),
  });
  public isMisMatch = false;
  public passwordStrength = 0;
  public passwordStrengthTracker = {
    upperCase: false,
    number: false,
    minLength: false,
    specialCharacter: false,
    lowerCase: false,
  };
  public passwordTracker = {
    upperCase: {
      text: 'At least 1 uppercase',
      valid: false,
      isValid: (value: string) => !!value.match(UpperCaseValidatorPattern),
    },
    lowerCase: {
      text: 'At least 1 lowercase',
      valid: false,
      isValid: (value: string) => !!value.match(LowerCaseValidatorPattern),
    },
    specialCharacter: {
      text: 'At least 1 special character eg: (@#$%^&*)',
      valid: false,
      isValid: (value: string) =>
        !!value.match(SpecialCharacterValidatorPattern),
    },
    number: {
      text: 'At least 1 number',
      valid: false,
      isValid: (value: string) => !!value.match(NumberValidatorPattern),
    },
    minLength: {
      text: 'At least 8 characters',
      valid: false,
      isValid: (value: string) => value.length >= 8,
    },
  };
  public readonly TotalChecks = Object.keys(this.passwordTracker).length;
  public readonly Trackers = Object.values(this.passwordTracker);

  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    this.passwordForm.valueChanges.subscribe((value) => {
      this.passwordForm.controls.confirmPassword.setErrors(null);
      if (value.password !== value.confirmPassword) {
        this.passwordForm.controls.confirmPassword.setErrors({
          misMatch: true,
        });
      }

      this.computePasswordStrength();
      this.passwordForm.markAllAsTouched();
    });
  }

  get fc() {
    return this.passwordForm.controls;
  }

  get weakStrength(): number {
    const strength = this.passwordStrength;

    if (strength >= 16 && strength < 32) {
      return 50;
    } else if (strength >= 32) {
      return 100;
    } else {
      return 0;
    }
  }

  get mediumStrength(): number {
    const strength = this.passwordStrength;

    if (strength >= 48 && strength < 64) {
      return 50;
    } else if (strength >= 64) {
      return 100;
    } else {
      return 0;
    }
  }

  get strongStrength(): number {
    const strength = this.passwordStrength;

    if (strength >= 80 && strength < 100) {
      return 50;
    } else if (strength === 100) {
      return 100;
    } else {
      return 0;
    }
  }

  get progressType() {
    const strength = this.passwordStrength;
    if (strength === 100) {
      return 'success';
    } else if (strength >= 48 && strength < 100) {
      return 'warning';
    } else {
      return 'danger';
    }
  }

  get trackerText() {
    const strength = this.passwordStrength;
    if (strength === 100) {
      return 'Strong password. Your password is secure.';
    } else if (strength >= 48 && strength < 100) {
      return 'Medium password. Your password is barely secure.';
    } else {
      return 'Weak password. Your password is vulnerable.';
    }
  }

  computePasswordStrength() {
    let passed = 0;
    const password = this.fc.password.value ?? '';
    this.passwordStrength = 0;
    for (let key of Object.keys(
      this.passwordTracker
    ) as (keyof typeof this.passwordTracker)[]) {
      const tracker = this.passwordTracker[key];
      tracker.valid = tracker.isValid(password);
      if (this.passwordTracker[key].valid) passed++;
    }
    this.passwordStrength = (passed / this.TotalChecks) * 100;
  }

  clear(control: FormControl<any>) {
    control.patchValue('');
  }

  submit() {
    this.router.navigateByUrl('/auth/login');
  }
}
