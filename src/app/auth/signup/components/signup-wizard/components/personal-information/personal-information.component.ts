import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormFieldComponent } from '@shared/components/forms/form-field/form-field.component';
import { FormTelInputComponent } from '@shared/components/forms/form-tel-input/form-tel-input.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-personal-information',
  imports: [FormFieldComponent, FormTelInputComponent, ReactiveFormsModule],
  templateUrl: './personal-information.component.html',
  styleUrl: './personal-information.component.scss',
})
export class PersonalInformationComponent implements OnInit {
  @Input() public personalData?: any;
  @Output() public onStepChange = new EventEmitter<{
    step: number;
    data: any;
  }>();

  public personalForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    middleName: new FormControl(''),
    gender: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    if (this.personalData) {
      this.personalForm.patchValue(this.personalData);
    }
  }

  public get fc() {
    return this.personalForm.controls;
  }

  public onSubmit(): void {
    if (this.personalForm.invalid) {
      this.personalForm.markAllAsTouched();
      return;
    }

    this.onStepChange.emit({
      step: 2,
      data: this.personalForm.value,
    });
  }
}
