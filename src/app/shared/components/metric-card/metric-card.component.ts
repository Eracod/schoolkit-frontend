import { Component, Input } from '@angular/core';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { IconDefinitions } from '../svg-icon/models';

@Component({
  selector: 'app-metric-card',
  imports: [SvgIconComponent],
  templateUrl: './metric-card.component.html',
  styleUrl: './metric-card.component.scss',
})
export class MetricCardComponent {
  @Input() public title: string = '';
  @Input() public value: number = 0;
  @Input() public icon: IconDefinitions = 'bar-chart-h-solid';
  @Input() public iconColor: string = '';
  @Input() public iconBgColor: string = '';
  @Input() public percent: number = 0;
  @Input() public percentText: string = '';
  @Input() public isMonetary: boolean = false;

  public currencySymbol: string = '₦';
  public iconSize: number = 25;

  get trendIcon(): IconDefinitions | undefined {
    if (this.percent > 0) {
      return 'arrow-trend-up';
    } else if (this.percent < 0) {
      return 'arrow-trend-down';
    }
    return;
  }

  get trendIconColor(): string {
    if (this.percent > 0) {
      return '#00B69B';
    } else if (this.percent < 0) {
      return '#F93C65';
    }
    return '';
  }
}
