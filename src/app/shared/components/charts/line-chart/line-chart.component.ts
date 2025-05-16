import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ChartData } from 'chart.js';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-line-chart',
  imports: [],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss',
})
export class LineChartComponent implements OnInit {
  @Input() public data: ChartData<'line'> = { labels: [], datasets: [] };
  @Input() showGridY: boolean = false;
  @Input() showGridX: boolean = true;
  @Input() public stackedY?: boolean;
  @Input() public stackedX?: boolean;
  @Input() public titleY?: string;
  @Input() public titleX?: string;

  public chart: Chart<'line'> | null = null;

  @ViewChild('chartCanvas', { static: true })
  chartCanvas!: ElementRef<HTMLCanvasElement>;

  constructor() {}

  ngOnInit() {
    this.createChart();
  }

  createChart() {
    this.chart = new Chart<'line', any>(this.chartCanvas.nativeElement, {
      type: 'line',
      data: this.data,
      options: {
        responsive: true,
        plugins: {
          tooltip: {
            mode: 'index',
          },
        },
        interaction: {
          mode: 'nearest',
          axis: 'x',
          intersect: false,
        },
        scales: {
          x: {
            grid: { display: this.showGridX },
            stacked: this.stackedX,
            title: {
              display: !!this.titleX,
              text: this.titleX,
            },
          },
          y: {
            grid: { display: this.showGridY },
            stacked: this.stackedY,
            title: {
              display: !!this.titleY,
              text: this.titleY,
            },
            suggestedMin: 5,
          },
        },
      },
    });
  }
}
