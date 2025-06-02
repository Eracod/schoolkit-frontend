import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Country } from '@shared/models/country.model';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private readonly http = inject(HttpClient);

  constructor() {}

  fetchCountries() {
    return this.http.get<Country[]>(`data/countries.json`);
  }
}
