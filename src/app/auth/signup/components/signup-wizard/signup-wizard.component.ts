import { Component, Input, OnInit } from '@angular/core';
import { StepperComponent } from '@shared/components/stepper/stepper.component';
import { StepperItemComponent } from '@shared/components/stepper/stepper-item/stepper-item.component';
import { PersonalInformationComponent } from './components/personal-information/personal-information.component';
import { CreatePasswordComponent } from './components/create-password/create-password.component';
import { Router, RouterLink } from '@angular/router';
import { LogoComponent } from '@shared/components/logo/logo.component';
import { RegisterRequest } from '@shared/models/auth';
import { AuthService } from '@shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';

interface PersonalData {
  firstName: string;
  lastName: string;
  middleName: string;
  gender: string;
  email: string;
  phone: string;
}

@Component({
  selector: 'app-signup-wizard',
  imports: [
    StepperComponent,
    StepperItemComponent,
    PersonalInformationComponent,
    CreatePasswordComponent,
    LogoComponent,
    RouterLink,
  ],
  templateUrl: './signup-wizard.component.html',
  styleUrl: './signup-wizard.component.scss',
})
export class SignupWizardComponent implements OnInit {
  @Input() public email: string = '';
  public activeStep = 1;
  public steps = [
    {
      title: 'Personal Information',
      step: 1,
      isCompleted: false,
    },
    {
      title: 'Create Password',
      step: 2,
      isCompleted: false,
    },
    {
      title: 'Finish',
      step: 3,
      isCompleted: false,
    },
  ];
  personalData?: Partial<PersonalData>;
  passwordData?: { password: string; confirmPassword: string };
  processing = false;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.personalData = { email: this.email };
  }

  public onStepChange({ step, data }: { step: number; data: any }): void {
    if (this.activeStep === 1) {
      this.personalData = data;
    }

    if (this.activeStep === 2) {
      this.passwordData = data;
    }

    if (step === 3) {
      this.register();
      return;
    }
    this.activeStep = step;
    this.steps.forEach((s) => {
      s.isCompleted = s.step < step;
    });
  }

  register() {
    if (this.processing) return;
    if (!this.personalData || !this.passwordData) return;
    const request: RegisterRequest = {
      confirmPassword: this.passwordData.confirmPassword,
      password: this.passwordData.password,
      email: this.email,
      firstName: this.personalData.firstName!,
      lastName: this.personalData.lastName!,
      gender: this.personalData.gender!,
      middleName: this.personalData.middleName!,
      phoneNumber: this.personalData.phone!,
    };

    this.processing = true;
    this.authService.register(request).subscribe({
      next: (response) => {
        console.log(response);
        this.activeStep = 3;
      },
      error: (error) => {
        this.toastr.error(error.error.message, 'Operation Failed');
        this.processing = false;
      },
    });
  }

  login() {
    this.router.navigate(['/']);
  }
}
