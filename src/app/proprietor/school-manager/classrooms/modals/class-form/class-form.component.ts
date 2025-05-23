import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormFieldComponent } from '@shared/components/forms/form-field/form-field.component';

@Component({
  selector: 'app-class-form',
  imports: [FormFieldComponent],
  templateUrl: './class-form.component.html',
  styleUrl: './class-form.component.scss',
})
export class ClassFormComponent {
  constructor(private readonly activeModal: NgbActiveModal) {}

  close() {
    this.activeModal.dismiss('closed');
  }
}
