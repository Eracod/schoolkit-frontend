import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { ApiResponse } from '@shared/models/base.model';
import {
  CreateInstitutionRequest,
  CreateInstitutionResponse,
} from '@shared/models/school.model';

@Injectable({
  providedIn: 'root',
})
export class OnboardingService {
  public API = `${environment.apiURL}/api`;

  constructor(private http: HttpClient) {}

  createInstitution(request: CreateInstitutionRequest, logo?: File) {
    return this.http.post<ApiResponse<CreateInstitutionResponse>>(
      `${this.API}/institution/create-institution`,
      request
    );
  }
}
