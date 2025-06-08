import { NgClass } from '@angular/common';
import {
  AfterContentInit,
  Component,
  Input,
  Renderer2,
  ViewContainerRef,
} from '@angular/core';
import { IDUtils } from '@shared/utils/id.util';

@Component({
  selector: 'app-form-switch',
  imports: [NgClass],
  templateUrl: './form-switch.component.html',
  styleUrl: './form-switch.component.scss',
})
export class FormSwitchComponent implements AfterContentInit {
  @Input({ alias: 'class' }) panelClass?: string;
  constructor(
    private readonly renderer: Renderer2,
    private readonly viewContainer: ViewContainerRef
  ) {}

  ngAfterContentInit(): void {
    const container: HTMLElement = this.viewContainer.element.nativeElement;
    const checkBox = container.querySelector(`input[type="checkbox"]`);
    const label = container.querySelector(`label`);
    const id = IDUtils.generateID('switch');
    if (checkBox) {
      this.renderer.addClass(checkBox, 'form-check-input');
      this.renderer.setAttribute(checkBox, 'id', id);
    }

    if (label) {
      this.renderer.addClass(label, 'form-check-label');
      this.renderer.setAttribute(label, 'for', id);
    }
  }
}
