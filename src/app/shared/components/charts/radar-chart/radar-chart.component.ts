import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartEvent, ChartType } from 'chart.js';

const chartType: ChartType = 'radar';

@Component({
  selector: 'app-radar-chart',
  imports: [],
  templateUrl: './radar-chart.component.html',
  styleUrl: './radar-chart.component.scss',
})
export class RadarChartComponent implements OnInit {
  @ViewChild('radarChart', { static: true })
  radarChartTemplate!: ElementRef<HTMLCanvasElement>;
  @Input() labels: string[] = [
    'Eating',
    'Drinking',
    'Sleeping',
    'Designing',
    'Coding',
    'Cycling',
    'Running',
  ];
  @Input() datasets: {
    label?: string;
    data: number[];
    backgroundColor: string | string[];
    borderColor?: string | string[];
    pointBackgroundColor?: string | string[];
    fill?: boolean;
  }[] = [
    {
      data: [65, 59, 90, 81, 56, 55, 40],
      backgroundColor: ['#84EBDD'],
      borderColor: ['rgb(255, 99, 132)'],
    },
  ];
  @Input() gapY: number = 20;
  @Input() gapX: number = 0;
  @Input() gridLineWidthY: number = 0.5;
  @Input() gridLineWidthX: number = 0.5;
  @Input() showX = true;
  @Input() showY = true;
  @Input() showGridY: boolean = false;
  @Input() showGridX: boolean = false;
  @Input() showLabelX = true;
  @Input() showLabelY = true;
  @Input() showPointValue = true;
  @Input() responsive = true;
  @Input() maintainAspectRatio = true;
  @Input() padding: string | number = 0;
  @Input() plugins: {
    id: string;
    beforeDatasetsDraw: (chart: Chart, args: any, plugins: any) => void;
  }[] = [];
  @Input() showLegend = false;

  public chart?: Chart;

  constructor() {}

  ngOnInit(): void {
    this.init();
  }

  init() {
    const canvas = this.radarChartTemplate.nativeElement;
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
        datasets: {
          radar: {
            borderWidth: 0,
            backgroundColor: this.datasets[0].backgroundColor,
            borderColor: this.datasets[0].borderColor,
          },
        },
        scales: {
          y: {
            display: this.showY,
            // beginAtZero: true,
            // grid: {
            //   display: this.showGridX,
            //   drawTicks: true,
            //   lineWidth: this.gridLineWidthY,
            // },
            axis: 'y',
            // grace: this.padding,
            ticks: {
              display: this.showLabelY,
              // callback: (value: number | string, index, ticks) => {
              //   if (!this.isVertical) value = this.labels[index];
              //   if (typeof this.formatLabelY === 'function') {
              //     value = this.formatLabelY(value);
              //   }
              //   return `${value}`;
              // },
              // stepSize: this.gapY,
            },
          },
          x: {
            display: this.showX,
            // beginAtZero: true,
            // grid: { display: this.showGridY, lineWidth: this.gridLineWidthX },
            axis: 'x',
            // grace: this.paddingX,
            ticks: {
              display: this.showLabelX,
              // callback: (value, index, ticks) => {
              //   if (this.isVertical) value = this.labels[index];
              //   if (typeof this.formatLabelX === 'function') {
              //     value = this.formatLabelX(value);
              //   }
              //   return `${value}`;
              // },
              // stepSize: this.gapX,
            },
          },
          r: {
            beginAtZero: true,
            ticks: {
              display: this.showPointValue,
            },
            grid: {
              circular: true,
            },
            grace: this.padding,
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
