import { Component } from '@angular/core';
import { LineChartComponent } from '@shared/components/charts/line-chart/line-chart.component';
import { ChartData } from 'chart.js';
import { min } from 'rxjs';

@Component({
  selector: 'app-payment-chart',
  imports: [LineChartComponent],
  templateUrl: './payment-chart.component.html',
  styleUrl: './payment-chart.component.scss',
})
export class PaymentChartComponent {
  data: ChartData<'line'> = {
    labels: this.generateLabels(),
    datasets: [
      {
        label: 'PTA Levy',
        data: [65, 59, 80, 81, 56, 55, 40, 70, 60, 80, 90, 100],
        fill: true,
        backgroundColor: '#118AB296',
        tension: 0.5,
      },
      {
        label: 'School Fees',
        data: [28, 48, 40, 19, 86, 27, 30, 50, 60, 70, 80, 90],
        fill: true,
        backgroundColor: '#FFD166',
        tension: 0.5,
      },
    ],
  };

  truncateDigit(value: number) {
    let wholeValue = Math.abs(value);

    if (value < 1000000) {
      return (value / 1000).toFixed(0) + 'K';
    } else if (value < 1000000000) {
      return (value / 1000000).toFixed(0) + 'M';
    } else if (value < 1000000000000) {
      return (value / 1000000000).toFixed(0) + 'B';
    } else {
      return wholeValue.toString();
    }
  }

  generateLabels() {
    const totalAmount = 60000;
    const minAmount = totalAmount / 12;
    const labels = [];

    let amount = minAmount;
    for (let i = 0; i < 12; i++) {
      labels.push(this.truncateDigit(amount));
      amount += minAmount;
    }
    return labels;
  }
}
