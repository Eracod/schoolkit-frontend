import { AbstractControl, ValidatorFn } from '@angular/forms';
import { ValidatorOptions } from './options.validator';
interface Options extends ValidatorOptions {
  uppercaseOnly?: boolean;
}

export const GetUpperCaseValidatorPattern = (options?: Options): RegExp => {
  let { min, max, uppercaseOnly } = options ?? {};
  const prefix = uppercaseOnly ? '^' : '';
  const suffix = uppercaseOnly ? '$' : '';

  return new RegExp(`${prefix}[A-Z]{${min ?? 1},${max ?? ''}}${suffix}`, 'g');
};

export const UpperCaseValidator = (options?: Options): ValidatorFn => {
  const pattern = GetUpperCaseValidatorPattern(options);
  return (control: AbstractControl) => {
    const value = control.value || '';
    if (!value.match(pattern)) {
      return { uppercase: options };
    }
    return null;
  };
};
