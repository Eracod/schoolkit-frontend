import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appFirstLetterCapitalize]',
  standalone: true,
})
export class FirstLetterCapitalizeDirective {
  constructor(private element: ElementRef<HTMLInputElement>) {}

  @HostListener('input')
  onInput() {
    const value = this.element.nativeElement.value ?? '';
    const letter = value.at(0) ?? '';

    if (letter.toUpperCase() !== letter) {
      this.element.nativeElement.value = `${letter.toUpperCase()}${value.substring(
        1
      )}`;
      this.element.nativeElement.dispatchEvent(
        new InputEvent('input', { bubbles: true })
      );
    }
  }
}
