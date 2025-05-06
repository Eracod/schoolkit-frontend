import {
  Component,
  Input,
  OnInit,
  Renderer2,
  RendererStyleFlags2,
  ViewContainerRef,
} from '@angular/core';
import { IDUtils } from '@shared/utils/id.util';

@Component({
  selector: 'app-form-check',
  imports: [],
  templateUrl: './form-check.component.html',
  styleUrl: './form-check.component.scss',
})
export class FormCheckComponent implements OnInit {
  @Input() size = 1;
  @Input() checkedColor = '#025f68';

  constructor(
    private readonly renderer: Renderer2,
    private readonly viewContainer: ViewContainerRef
  ) {}

  public ngOnInit(): void {
    const container: HTMLElement = this.viewContainer.element.nativeElement;
    const input = container.querySelector<HTMLInputElement>(
      `input[type="checkbox"]`
    );
    const label = container.querySelector(`label`);
    const checkContainer = container.querySelector('.form-check');
    const id = IDUtils.generateID('check');

    if (input) {
      this.renderer.addClass(input, 'form-check-input');
      this.renderer.setAttribute(input, 'id', id);
      this.renderer.setStyle(input, 'width', `${this.size}em`);
      this.renderer.setStyle(input, 'height', `${this.size}em`);
      this.renderer.setStyle(
        input,
        '--form-checked-color',
        this.checkedColor,
        RendererStyleFlags2.DashCase
      );
    }

    if (label) {
      this.renderer.addClass(label, 'form-check-label');
      this.renderer.setAttribute(label, 'for', id);
      this.renderer.setStyle(label, 'margin-bottom', '-0.5em');
      this.renderer.setStyle(label, 'user-select', 'none');
    }
  }
}
