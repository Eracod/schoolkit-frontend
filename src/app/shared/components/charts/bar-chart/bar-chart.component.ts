import { formatNumber } from '@angular/common';
import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CalendarUtils } from '@shared/utils/calendar.util';
import { Chart, ChartEvent, ChartType, registerables } from 'chart.js';

Chart.register(...registerables);
const chartType: ChartType = 'bar';

@Component({
  selector: 'app-bar-chart',
  imports: [],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss',
})
export class BarChartComponent implements OnInit, OnDestroy {
  @Input() labels: string[] = CalendarUtils.months;
  @Input() datasets: {
    label?: string;
    data: number[];
    backgroundColor: string[];
    borderColor?: string[];
  }[] = [
    {
      label: 'Dataset',
      data: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55],
      backgroundColor: ['#84EBDD'],
      borderColor: ['rgb(255, 99, 132)'],
    },
  ];
  @Input() borderRadius = 5;
  @Input() borderSkipped:
    | boolean
    | 'start'
    | 'end'
    | 'left'
    | 'right'
    | 'bottom'
    | 'top'
    | 'middle' = false;
  @Input() borderWidth = 0;
  @Input() barWidth = 15;
  @Input() showLegend = false;
  @Input() yAxisUnit = '%';
  @Input() xAxisUnit?: string;
  @Input() gapY: number = 20;
  @Input() gapX: number = 0;
  @Input() gridLineWidthY: number = 0.5;
  @Input() gridLineWidthX: number = 0.5;
  @Input() showGridY: boolean = false;
  @Input() showGridX: boolean = true;
  @Input() paddingY: string | number = 0;
  @Input() paddingX: string | number = 0;
  @Input() isVertical = true;
  @Input() formatLabelX?: (value: number | string) => string;
  @Input() formatLabelY?: (value: number | string) => string;
  @Input() responsive = true;
  @Input() maintainAspectRatio = true;
  @Input() showLabelX = true;
  @Input() showLabelY = true;
  @Input() offsetY = true;
  @Input() offsetX = true;
  @Input() isStacked = false;
  @Input() plugins: {
    id: string;
    beforeDatasetsDraw: (chart: Chart, args: any, plugins: any) => void;
  }[] = [];

  @ViewChild('barChart', { static: true })
  barChartTemplate!: ElementRef<HTMLCanvasElement>;

  public chart!: Chart;

  constructor() {}

  ngOnInit(): void {
    this.init();
  }

  ngOnDestroy(): void {
    this.chart.destroy();
  }

  init() {
    const canvas = this.barChartTemplate.nativeElement;
    const ctx: any = canvas.getContext('2d');

    this.chart = new Chart(ctx, {
      type: chartType,
      data: {
        datasets: this.datasets,
        labels: this.labels,
      },
      plugins: this.plugins,
      options: {
        maintainAspectRatio: this.maintainAspectRatio,
        responsive: this.responsive,
        font: { family: 'Axiforma', style: 'normal', weight: 'normal' },
        indexAxis: this.isVertical ? 'x' : 'y',
        datasets: {
          bar: {
            borderRadius: this.borderRadius,
            borderWidth: this.borderWidth,
            borderSkipped: this.borderSkipped,
            barThickness: this.barWidth,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              display: this.showGridX,
              drawTicks: true,
              lineWidth: this.gridLineWidthY,
            },
            axis: 'y',
            ticks: {
              display: this.showLabelY,
              callback: (value: number | string, index, ticks) => {
                if (!this.isVertical) value = this.labels[index];
                if (typeof this.formatLabelY === 'function') {
                  value = this.formatLabelY(value);
                }
                return `${value}`;
              },
              stepSize: this.gapY,
            },
            grace: this.paddingY,
            offset: this.offsetY,
          },
          x: {
            stacked: this.isStacked,
            beginAtZero: true,
            grid: { display: this.showGridY, lineWidth: this.gridLineWidthX },
            axis: 'x',
            grace: this.paddingX,
            ticks: {
              display: this.showLabelX,
              callback: (value, index, ticks) => {
                if (this.isVertical) value = this.labels[index];
                if (typeof this.formatLabelX === 'function') {
                  value = this.formatLabelX(value);
                }
                return `${value}`;
              },
              stepSize: this.gapX,
            },
            offset: this.offsetX,
          },
        },
        plugins: {
          legend: {
            display: this.showLegend,
          },
        },
        onHover: (event: ChartEvent, elements: object[]) => {},
        onClick: (event: ChartEvent, elements: object[]) => {},
      },
    });
  }
}
