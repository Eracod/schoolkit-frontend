import { Component, inject } from '@angular/core';
import { MainLayoutComponent } from '@shared/components/layouts/main-layout/main-layout.component';
import { MetricCardComponent } from '@shared/components/metric-card/metric-card.component';
import { ProfileCardComponent } from '@shared/components/profile-card/profile-card.component';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { PaymentChartComponent } from './components/payment-chart/payment-chart.component';
import { NgIf, NgTemplateOutlet } from '@angular/common';
import { SvgIconComponent } from '@shared/components/svg-icon/svg-icon.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [
    MainLayoutComponent,
    MetricCardComponent,
    ProfileCardComponent,
    CarouselModule,
    PaymentChartComponent,
    NgIf,
    NgTemplateOutlet,
    SvgIconComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  public options: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    items: 6,
    lazyLoad: true,
    navText: ['', ''],
    stagePadding: window.innerWidth > 992 ? 30 : 10,
    skip_validateItems: true,
    responsive: {
      0: {
        items: 1,
      },
      740: {
        items: 2,
      },
      940: {
        items: 4,
      },
      1200: {
        items: 6,
      },
    },
    nav: true,
  };

  public users = [
    {
      id: 'id-1',
      name: 'John Doe',
      designation: 'Software Engineer',
      src: 'assets/images/user1.png',
    },
    {
      id: 'id-2',
      name: 'Jane Smith',
      designation: 'Product Manager',
      src: 'assets/images/user2.png',
    },
    {
      id: 'id-3',
      name: 'Alice Johnson',
      designation: 'UX Designer',
      src: 'assets/images/user3.png',
    },
    {
      id: 'id-4',
      name: 'Bob Brown',
      designation: 'Data Scientist',
      src: 'assets/images/user4.png',
    },
    {
      id: 'id-5',
      name: 'Charlie Davis',
      designation: 'DevOps Engineer',
      src: 'assets/images/user5.png',
    },
    {
      id: 'id-6',
      name: 'Eve White',
      designation: 'QA Engineer',
      src: 'assets/images/user6.png',
    },
    {
      id: 'id-7',
      name: 'Frank Green',
      designation: 'Business Analyst',
      src: 'assets/images/user7.png',
    },
    {
      id: 'id-8',
      name: 'Grace Black',
      designation: 'Marketing Specialist',
      src: 'assets/images/user8.png',
    },
  ];
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  constructor() {}

  goto(url: string) {
    this.router.navigate([url], { relativeTo: this.route });
  }
}
