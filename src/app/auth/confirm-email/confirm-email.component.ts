import { Component, inject, OnInit } from '@angular/core';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import { AuthService } from '@shared/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-confirm-email',
  imports: [LoaderComponent],
  templateUrl: './confirm-email.component.html',
  styleUrl: './confirm-email.component.scss',
})
export class ConfirmEmailComponent implements OnInit {
  public processing = false;
  public confirmed = false;
  private activatedRoute = inject(ActivatedRoute);
  private authService = inject(AuthService);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  ngOnInit(): void {
    const { userId, token, email } = this.activatedRoute.snapshot.queryParams;
    this.processing = true;
    this.authService
      .confirmEmail({
        email,
        token: `${token}`.replaceAll(/[ ]/g, '+'),
        userId,
      })
      .subscribe({
        next: (response) => {
          this.processing = false;
          this.confirmed = response.data;
          this.toastr.success(response.message);
        },
        error: (error) => {
          this.processing = false;
          const message = error.error?.message || error.message;
          this.toastr.error(message);
        },
      });
  }

  login() {
    this.router.navigateByUrl('/');
  }
}
