import { NgTemplateOutlet } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormFieldComponent } from '@shared/components/forms/form-field/form-field.component';
import { SvgIconComponent } from '@shared/components/svg-icon/svg-icon.component';
import { ChipModule } from '../../../../shared/components/chip/chip.module';
import {
  COMMA,
  KEY_ENTER,
  KeyCode,
} from '@shared/components/chip/models/keycodes';

enum StaffFormViews {
  Main,
  RoleAndPermissions,
}

@Component({
  selector: 'app-staff-form',
  imports: [FormFieldComponent, SvgIconComponent, NgTemplateOutlet, ChipModule],
  templateUrl: './staff-form.component.html',
  styleUrl: './staff-form.component.scss',
})
export class StaffFormComponent {
  private readonly activeModal = inject(NgbActiveModal);
  public currentView: StaffFormViews = StaffFormViews.RoleAndPermissions;
  public StaffFormViews = StaffFormViews;
  public roles = [
    { name: 'Administrator', value: 'administrator' },
    { name: 'Teacher', value: 'teacher' },
    { name: 'Principal', value: 'principal' },
    { name: 'Accountant', value: 'accountant' },
    { name: 'Librarian', value: 'librarian' },
    { name: 'Sports', value: 'sports' },
  ];
  public keySeparators: KeyCode[] = [COMMA, KEY_ENTER];
  public selectedRoles: string[] = ['administrator', 'teacher'];

  close() {
    this.activeModal.close();
  }

  save() {
    // Logic to save staff details
    this.activeModal.close('Staff saved successfully');
  }

  next() {
    this.currentView = StaffFormViews.RoleAndPermissions;
  }

  prev() {
    if (this.currentView === StaffFormViews.RoleAndPermissions) {
      this.currentView = StaffFormViews.Main;
    }
  }
}
