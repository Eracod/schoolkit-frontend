import { Component } from '@angular/core';
import { SvgIconComponent } from '../../../../shared/components/svg-icon/svg-icon.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payments',
  imports: [SvgIconComponent],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.scss',
})
export class PaymentsComponent {
  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  goBack() {
    this.router.navigate(['..'], {
      relativeTo: this.route,
    });
  }
}
