import { Component } from '@angular/core';
import { MainLayoutComponent } from '@shared/components/layouts/main-layout/main-layout.component';
import { FormFieldComponent } from '../../../shared/components/forms/form-field/form-field.component';

@Component({
  selector: 'app-create-institution',
  imports: [MainLayoutComponent, FormFieldComponent],
  templateUrl: './create-institution.component.html',
  styleUrl: './create-institution.component.scss',
})
export class CreateInstitutionComponent {}
