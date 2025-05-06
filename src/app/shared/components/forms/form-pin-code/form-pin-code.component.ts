import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { FormFieldComponent } from '../form-field/form-field.component';
import {
  ControlValueAccessor,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { FirstLetterCapitalizeDirective } from '@shared/directives/first-letter-capitalize.directive';

@Component({
  selector: 'app-form-pin-code',
  imports: [
    FormFieldComponent,
    ReactiveFormsModule,
    FirstLetterCapitalizeDirective,
  ],
  templateUrl: './form-pin-code.component.html',
  styleUrl: './form-pin-code.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormPinCodeComponent),
      multi: true,
    },
  ],
})
export class FormPinCodeComponent implements OnInit, ControlValueAccessor {
  @Input() digit = 6;
  @Input() separatePoint = 3;
  public pinCodeForm: FormGroup<{
    codes: FormArray<FormGroup<{ code: FormControl<string | null> }>>;
  }> = new FormGroup({
    codes: new FormArray<any>([]),
  });

  private _onChange: any;
  private _onTouched: any;
  private _unsubscriber = new Subject<void>();

  constructor(private readonly fb: FormBuilder) {}

  writeValue(value: string): void {
    this.pinCodeForm.controls.codes.controls.forEach((control, index) => {
      control.patchValue({ code: (value[index] ?? '').toUpperCase() });
    });
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.pinCodeForm.disable();
    } else {
      this.pinCodeForm.enable();
    }
  }

  ngOnInit(): void {
    const codeArray = new Array(this.digit).fill(0);
    codeArray.forEach(() => {
      this.pinCodeForm.controls.codes.push(
        new FormGroup({ code: new FormControl('') })
      );
    });

    this.pinCodeForm.valueChanges
      .pipe(takeUntil(this._unsubscriber))
      .subscribe((value) => {
        if (value && value.codes) {
          const codes = value.codes.map((item) => item.code ?? '').join('');
          if (this._onChange) this._onChange(codes);
        }
        if (this._onTouched) this._onTouched(true);
      });
  }

  onInput(event: KeyboardEvent, index: number) {
    if (event.key === 'Backspace' || event.key === 'Control' || event.ctrlKey) {
      return;
    }

    const field = document.querySelectorAll('app-form-field')[index + 1];
    if (field) {
      const input = field.querySelector('input');
      if (input) {
        input.focus();
      }
    }
  }

  onPaste(event: ClipboardEvent) {
    event.preventDefault();
    let paste: string = (
      event.clipboardData || (window as any).clipboardData
    ).getData('text');
    if (paste) {
      this.pinCodeForm.controls.codes.controls.forEach((control, index) => {
        control.patchValue({ code: paste[index] ?? '' });
      });
    }
  }
}
