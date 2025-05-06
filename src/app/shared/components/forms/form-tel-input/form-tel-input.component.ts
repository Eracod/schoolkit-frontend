import { Component, forwardRef, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  ReactiveFormsModule,
  ValidatorFn,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import {
  CountryISO,
  NgxIntlTelInputModule,
  SearchCountryField,
} from 'ngx-intl-tel-input';
import { TIME_ZONES } from '@shared/constants/timezones.constant';

const TelValidator: ValidatorFn = (
  control: AbstractControl<Telephone | null>
) => {
  const value = control.value;
  if (!value) {
    return null;
  }

  if (!value.countryCode) {
    return { requiredCountryCode: true };
  }

  if (value.number.length < 8) {
    return { invalidPhoneNumber: true };
  }
  return null;
};

interface Telephone {
  number: string;
  internationalNumber: string;
  nationalNumber: string;
  e164Number: string;
  countryCode: string;
  dialCode: string;
}

@Component({
  selector: 'app-form-tel-input',
  standalone: true,
  imports: [NgxIntlTelInputModule, ReactiveFormsModule],
  templateUrl: './form-tel-input.component.html',
  styleUrls: ['./form-tel-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormTelInputComponent),
      multi: true,
    },
  ],
})
export class FormTelInputComponent implements OnInit, ControlValueAccessor {
  @Input() preferredCountries: CountryISO[] = [];
  public searchCountryField = [
    SearchCountryField.Iso2,
    SearchCountryField.Name,
  ];
  public inputID = `tel-${Date.now()}${Math.round(Math.random() * 1e5)}`;
  public selectedCountryISO!: CountryISO;
  public inputControl = new FormControl<Telephone | null>(null, [TelValidator]);

  private _onChange: any;
  private _onTouched: any;

  constructor() {}

  writeValue(value: any): void {
    this.inputControl.patchValue(value);
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) this.inputControl.disable();
    else this.inputControl.enable();
  }

  ngOnInit() {
    const timezone = (
      Intl.DateTimeFormat().resolvedOptions().timeZone ?? ''
    ).toLowerCase();
    const rawTimezone = TIME_ZONES.find(
      (d) => d.name.toLowerCase() === timezone
    );

    if (rawTimezone) {
      const countryISO: any = rawTimezone?.countryCode.toLowerCase() as any;
      if (Object.values(CountryISO).includes(countryISO)) {
        this.selectedCountryISO = countryISO;
      }
    }
    this.inputControl.valueChanges.subscribe((value) => {
      if (value) {
        this._onChange(value.internationalNumber.split(' ').join(''));
      }
      if (this._onTouched) this._onTouched(true);
    });
  }
}
