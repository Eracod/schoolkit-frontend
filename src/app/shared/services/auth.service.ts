import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '@shared/models/base.model';
import {
  ConfirmEmailRequest,
  LoginRequest,
  RegisterRequest,
  VerifyEmailResponse,
} from '@shared/models/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public API = `${environment.apiURL}/api`;
  constructor(private http: HttpClient) {}

  verifyEmail(email: string) {
    return this.http.get<ApiResponse<VerifyEmailResponse>>(
      `${this.API}/auth/verify-email`,
      {
        params: { email },
      }
    );
  }

  confirmEmail(request: ConfirmEmailRequest) {
    return this.http.post<ApiResponse<boolean>>(
      `${this.API}/auth/confirm-email`,
      request
    );
  }

  register(request: RegisterRequest) {
    return this.http.post<ApiResponse<any>>(
      `${this.API}/auth/register`,
      request
    );
  }

  login(request: LoginRequest) {
    return this.http.post<ApiResponse<any>>(`${this.API}/auth/login`, {
      ...request,
      phoneNumber: '',
    });
  }
}
