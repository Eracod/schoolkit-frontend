import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MainLayoutComponent } from '@shared/components/layouts/main-layout/main-layout.component';
import { SvgIconComponent } from '@shared/components/svg-icon/svg-icon.component';
import { StaffFormComponent } from './modals/staff-form/staff-form.component';

@Component({
  selector: 'app-staffs',
  imports: [MainLayoutComponent, SvgIconComponent, RouterOutlet],
  templateUrl: './staffs.component.html',
  styleUrl: './staffs.component.scss',
})
export class StaffsComponent {
  private readonly modal = inject(NgbModal);

  createStaff() {
    this.modal.open(StaffFormComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      centered: true,
      scrollable: true,
    });
  }
}
