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
  public activeStep = 2;
}
