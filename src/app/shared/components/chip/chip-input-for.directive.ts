import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { ChipGridComponent } from './chip-grid/chip-grid.component';
import { COMMA, KeyCode } from './models/keycodes';

@Directive({
  selector: '[appChipInputFor]',
  standalone: false,
})
export class ChipInputForDirective {
  @Input() appChipInputFor!: ChipGridComponent;
  @Input() appChipInputAddOnBlur = false;
  @Input() appChipSeparatorKeys: KeyCode[] = [COMMA];
  @Output() appChipTokenEnd = new EventEmitter<string>();

  constructor(private element: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: KeyboardEvent): void {
    event.stopPropagation();
    const keyCode = event.key;
    const inputValue = this.element.nativeElement.value;
    if (this.appChipSeparatorKeys.includes(keyCode as KeyCode)) {
      const trimmedValue = inputValue.trim();
      if (trimmedValue) {
        this.appChipTokenEnd.emit(trimmedValue);
        this.element.nativeElement.value = '';
      }
    }
  }

  @HostListener('blur', ['$event'])
  onBlur(event: FocusEvent): void {
    event.stopPropagation();
    if (this.appChipInputAddOnBlur) {
      const inputValue = this.element.nativeElement.value.trim();
      if (inputValue) {
        this.appChipTokenEnd.emit(inputValue);
        this.element.nativeElement.value = '';
      }
    }
  }
}
