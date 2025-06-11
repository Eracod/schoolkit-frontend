import { Component, inject } from '@angular/core';
import { MainLayoutComponent } from '@shared/components/layouts/main-layout/main-layout.component';
import { FormFieldComponent } from '@shared/components/forms/form-field/form-field.component';
import { AvatarComponent } from '@shared/components/avatar/avatar.component';
import { SvgIconComponent } from '@shared/components/svg-icon/svg-icon.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormTelInputComponent } from '../../shared/components/forms/form-tel-input/form-tel-input.component';
import { LoaderComponent } from '@shared/components/loader/loader.component';
import { OnboardingService } from '@shared/services/onboarding.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

const URL_PATTERN =
  /(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

@Component({
  selector: 'app-create-institution',
  imports: [
    MainLayoutComponent,
    FormFieldComponent,
    AvatarComponent,
    SvgIconComponent,
    ReactiveFormsModule,
    FormTelInputComponent,
    LoaderComponent,
  ],
  templateUrl: './create-institution.component.html',
  styleUrl: './create-institution.component.scss',
})
export class CreateInstitutionComponent {
  public institutionForm = new FormGroup({
    Name: new FormControl('', [Validators.required]),
    Address: new FormControl('', [Validators.required]),
    Email: new FormControl('', [Validators.required, Validators.email]),
    ContactPhoneNumber: new FormControl('', [Validators.required]),
    Website: new FormControl('', [
      Validators.required,
      Validators.pattern(URL_PATTERN),
    ]),
    Motto: new FormControl(''),
  });
  public logoUrl = 'images/default-image.svg';
  public logo?: File;
  public processing = false;
  private onboardingService = inject(OnboardingService);
  private router = inject(Router);
  private toast = inject(ToastrService);

  get fc() {
    return this.institutionForm.controls;
  }

  onChangeLogo(event: any) {
    const file = event.target.files[0];
    this.logo = file;
    this.logoUrl = URL.createObjectURL(file);
    event.currentTarget.value = '';
  }

  create() {
    if (this.institutionForm.invalid) {
      this.institutionForm.markAllAsTouched();
      return;
    }

    const request = this.institutionForm.value as any;
    this.processing = true;
    this.onboardingService.createInstitution(request, this.logo).subscribe({
      next: (response) => {
        this.processing = false;
        this.toast.success(
          'Institution was created successfully',
          'Congratulations'
        );
        this.router.navigateByUrl('/proprietor');
      },
      error: (error) => {
        this.processing = false;
        const message = error.error?.message || error.message;
        this.toast.error(message);
      },
    });
  }
}
