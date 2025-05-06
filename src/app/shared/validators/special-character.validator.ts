import { AbstractControl, ValidatorFn } from '@angular/forms';
import { ValidatorOptions } from './options.validator';
interface Options extends ValidatorOptions {
  specialCharacterOnly?: boolean;
}

export const GetSpecialCharacterValidatorPattern = (
  options?: Options
): RegExp => {
  let { min, max, specialCharacterOnly } = options ?? {};
  const prefix = specialCharacterOnly ? '^' : '';
  const suffix = specialCharacterOnly ? '$' : '';

  return new RegExp(
    `${prefix}[\\\~\\\`\\\!\\\@\\\#\\\$\\\%\\\^\\\&\\\*\\\(\\\)\\\-\\\_\\\+\\\=\\\[\\\]\\\|\\\;\\\:\\\"\\\<\\\>]{${
      min ?? 1
    },${max ?? ''}}${suffix}`,
    'g'
  );
};

export const SpecialCharacterValidator = (options?: Options): ValidatorFn => {
  const pattern = GetSpecialCharacterValidatorPattern(options);
  return (control: AbstractControl) => {
    const value = control.value || '';
    if (!value.match(pattern)) {
      return { specialCharacter: options };
    }
    return null;
  };
};
