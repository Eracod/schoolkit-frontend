import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormFieldComponent } from '@shared/components/forms/form-field/form-field.component';

@Component({
  selector: 'app-subject-form',
  imports: [FormFieldComponent],
  templateUrl: './subject-form.component.html',
  styleUrl: './subject-form.component.scss',
})
export class SubjectFormComponent {
  constructor(private activeModal: NgbActiveModal) {}

  close() {
    this.activeModal.dismiss('closed');
  }
}
