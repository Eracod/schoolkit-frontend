import { Component } from '@angular/core';
import { StepperComponent } from '@shared/components/stepper/stepper.component';
import { StepperItemComponent } from '@shared/components/stepper/stepper-item/stepper-item.component';
import { PersonalInformationComponent } from './components/personal-information/personal-information.component';
import { CreatePasswordComponent } from './components/create-password/create-password.component';

@Component({
  selector: 'app-signup-wizard',
  imports: [
    StepperComponent,
    StepperItemComponent,
    PersonalInformationComponent,
    CreatePasswordComponent,
  ],
  templateUrl: './signup-wizard.component.html',
  styleUrl: './signup-wizard.component.scss',
})
export class SignupWizardComponent {
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
  personalInformationData: any;
  passwordData: any;

  public onStepChange(step: number, data: any): void {
    if (this.activeStep === 1) {
      this.personalInformationData = data;
    }

    if (this.activeStep === 2) {
      this.passwordData = data;
    }

    this.activeStep = step;
    this.steps.forEach((s) => {
      s.isCompleted = s.step < step;
    });
  }
}
