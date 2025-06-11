import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { CreateInstitutionRequest } from '@shared/models/school.model';

@Injectable({
  providedIn: 'root',
})
export class OnboardingService {
  public API = `${environment.apiURL}/api`;

  constructor(private http: HttpClient) {}

  createInstitution(request: CreateInstitutionRequest, logo?: File) {
    const formData = new FormData();
    if (logo) {
      formData.append('Logo', logo);
    }

    return this.http.post(
      `${this.API}/institution/create-institution`,
      formData,
      { params: { ...request } }
    );
  }
}
