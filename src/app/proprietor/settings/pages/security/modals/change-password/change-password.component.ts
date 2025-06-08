import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormFieldComponent } from '@shared/components/forms/form-field/form-field.component';

@Component({
  selector: 'app-change-password',
  imports: [FormFieldComponent],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
})
export class ChangePasswordComponent {
  constructor(private readonly activeModal: NgbActiveModal) {}

  close() {
    this.activeModal.close();
  }
}
