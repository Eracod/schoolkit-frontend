import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import { CircleUtils } from '@shared/utils/circle.util';

@Component({
  selector: 'app-circle-progress-bar',
  imports: [],
  templateUrl: './circle-progress-bar.component.html',
  styleUrl: './circle-progress-bar.component.scss',
})
export class CircleProgressBarComponent implements OnInit {
  @Input() public progress: number = 0;
  @Input() public size: number = 40;
  @Input() public color: string = 'orange';
  @ViewChild('progressBar', { static: true })
  public progressBar!: ElementRef<SVGPathElement>;

  public fontSize = 10;
  constructor(private readonly viewConteiner: ViewContainerRef) {}

  ngOnInit(): void {
    const container: HTMLElement = this.viewConteiner.element.nativeElement;
    container.style.width = `${this.size}px`;
    container.style.height = `${this.size}px`;
    container.style.borderRadius = '50%';
    this.fontSize = this.size / 4.5;

    setInterval(() => {
      if (++this.progress > 100) this.progress = 0;
      this.drawCircle();
    }, 500);
  }

  drawCircle() {
    const degree = (this.progress / 100) * 360;
    const startAngle = -90;
    const endAngle = degree - 90;
    const radius = 10;
    const spread = 2;
    const x = 12;
    const y = 12;

    this.progressBar.nativeElement.setAttribute(
      'd',
      CircleUtils.describeArc(x, y, radius, spread, startAngle, endAngle)
    );
  }
}
