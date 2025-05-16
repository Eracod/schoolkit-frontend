import { Component } from '@angular/core';
import { MainLayoutComponent } from '@shared/components/layouts/main-layout/main-layout.component';
import { MetricCardComponent } from '../../shared/components/metric-card/metric-card.component';
import { ProfileCardComponent } from '../../shared/components/profile-card/profile-card.component';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-dashboard',
  imports: [
    MainLayoutComponent,
    MetricCardComponent,
    ProfileCardComponent,
    CarouselModule,
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
        items: 2,
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
  ];
}
