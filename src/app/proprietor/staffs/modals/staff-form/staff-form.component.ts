import { NgTemplateOutlet } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  NgbActiveModal,
  NgbTypeaheadModule,
  NgbTypeaheadSelectItemEvent,
} from '@ng-bootstrap/ng-bootstrap';
import { FormFieldComponent } from '@shared/components/forms/form-field/form-field.component';
import { SvgIconComponent } from '@shared/components/svg-icon/svg-icon.component';
import { ChipModule } from '../../../../shared/components/chip/chip.module';
import {
  COMMA,
  KEY_ENTER,
  KeyCode,
} from '@shared/components/chip/models/keycodes';
import { debounceTime, map, Observable, OperatorFunction } from 'rxjs';

enum StaffFormViews {
  Main,
  RoleAndPermissions,
}

@Component({
  selector: 'app-staff-form',
  imports: [
    FormFieldComponent,
    SvgIconComponent,
    NgTemplateOutlet,
    ChipModule,
    NgbTypeaheadModule,
  ],
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
  public classes = [];
  public keySeparators: KeyCode[] = [COMMA, KEY_ENTER];
  public selectedRoles: string[] = [];

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

  searchRole: OperatorFunction<
    string,
    readonly { name: string; value: string }[]
  > = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map((term) =>
        term === ''
          ? this.roles
          : this.roles
              .filter(
                (v) => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1
              )
              .slice(0, 10)
      )
    );

  roleFormatter = (x: { name: string }) => x.name;

  addRole(event: NgbTypeaheadSelectItemEvent) {
    const item = event.item;

    if (this.selectedRoles.includes(item.value)) return;
    this.selectedRoles.push(item.value);
  }
}
