import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stepper-item',
  imports: [],
  templateUrl: './stepper-item.component.html',
  styleUrl: './stepper-item.component.scss',
})
export class StepperItemComponent {
  @Input() public step: number = 0;
  @Input() public title: string = '';
  @Input() public isActive: boolean = false;
  @Input() public isCompleted: boolean = false;
}
