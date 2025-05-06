import { AbstractControl, ValidatorFn } from '@angular/forms';
import { ValidatorOptions } from './options.validator';
interface Options extends ValidatorOptions {
  lowercaseOnly?: boolean;
}

export const GetLowerCaseValidatorPattern = (options?: Options): RegExp => {
  let { min, max, lowercaseOnly } = options ?? {};
  const prefix = lowercaseOnly ? '^' : '';
  const suffix = lowercaseOnly ? '$' : '';

  return new RegExp(`${prefix}[a-z]{${min ?? 1},${max ?? ''}}${suffix}`, 'g');
};

export const LowerCaseValidator = (options?: Options): ValidatorFn => {
  const pattern = GetLowerCaseValidatorPattern(options);
  return (control: AbstractControl) => {
    const value = control.value || '';
    if (!value.match(pattern)) {
      return { Lowercase: options };
    }
    return null;
  };
};
