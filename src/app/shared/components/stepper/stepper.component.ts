import {
  Component,
  Input,
  OnInit,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-stepper',
  imports: [],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class StepperComponent implements OnInit {
  @Input() public isVertical = true;

  constructor(private readonly viewContainer: ViewContainerRef) {}

  ngOnInit() {
    this.viewContainer.element.nativeElement.classList.add(
      this.isVertical ? 'vertical-stepper' : 'horizontal-stepper'
    );
  }
}
