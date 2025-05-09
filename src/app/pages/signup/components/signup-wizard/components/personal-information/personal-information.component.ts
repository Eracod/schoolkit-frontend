import { Component } from '@angular/core';
import { FormFieldComponent } from '@shared/components/forms/form-field/form-field.component';
import { FormTelInputComponent } from "../../../../../../shared/components/forms/form-tel-input/form-tel-input.component";

@Component({
  selector: 'app-personal-information',
  imports: [FormFieldComponent, FormTelInputComponent],
  templateUrl: './personal-information.component.html',
  styleUrl: './personal-information.component.scss',
})
export class PersonalInformationComponent {}
