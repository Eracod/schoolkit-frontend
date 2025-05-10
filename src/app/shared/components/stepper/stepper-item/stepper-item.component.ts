import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewContainerRef,
} from '@angular/core';

@Component({
  selector: 'app-stepper-item',
  imports: [],
  templateUrl: './stepper-item.component.html',
  styleUrl: './stepper-item.component.scss',
})
export class StepperItemComponent implements OnInit, OnChanges {
  @Input() public step: number = 0;
  @Input() public title: string = '';
  @Input() public isActive: boolean = false;
  @Input() public isCompleted: boolean = false;

  constructor(private viewContainer: ViewContainerRef) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    const container = this.viewContainer.element.nativeElement;
    if (container) {
      this.isActive || this.isCompleted
        ? container.classList.add('active')
        : '';
    }
  }
}
