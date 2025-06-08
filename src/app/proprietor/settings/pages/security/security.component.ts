import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SvgIconComponent } from '@shared/components/svg-icon/svg-icon.component';
import { ChangePasswordComponent } from './modals/change-password/change-password.component';

@Component({
  selector: 'app-security',
  imports: [SvgIconComponent],
  templateUrl: './security.component.html',
  styleUrl: './security.component.scss',
})
export class SecurityComponent {
  constructor(
    private readonly modal: NgbModal,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  goBack() {
    this.router.navigate(['..'], {
      relativeTo: this.route,
    });
  }

  onChangePassword() {
    this.modal.open(ChangePasswordComponent, {
      size: 'md',
      backdrop: 'static',
    });
  }
}
