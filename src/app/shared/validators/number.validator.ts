import { AbstractControl, ValidatorFn } from '@angular/forms';
import { ValidatorOptions } from './options.validator';
interface Options extends ValidatorOptions {
  numberOnly?: boolean;
}

export const GetNumberValidatorPattern = (options?: Options): RegExp => {
  let { min, max, numberOnly } = options ?? {};
  const prefix = numberOnly ? '^' : '';
  const suffix = numberOnly ? '$' : '';

  return new RegExp(`${prefix}[0-9]{${min ?? 1},${max ?? ''}}${suffix}`, 'g');
};

export const NumberValidator = (options?: Options): ValidatorFn => {
  const pattern = GetNumberValidatorPattern(options);
  return (control: AbstractControl) => {
    const value = control.value || '';
    if (!value.match(pattern)) {
      return { number: options };
    }
    return null;
  };
};
