import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormFieldComponent } from '@shared/components/forms/form-field/form-field.component';

@Component({
  selector: 'app-session-form',
  imports: [FormFieldComponent],
  templateUrl: './session-form.component.html',
  styleUrl: './session-form.component.scss',
})
export class SessionFormComponent {
  constructor(private activeModal: NgbActiveModal) {}

  close() {
    this.activeModal.dismiss('closed');
  }
}
