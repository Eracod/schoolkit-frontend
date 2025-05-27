import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { SvgIconComponent } from '@shared/components/svg-icon/svg-icon.component';
import { TableContainerComponent } from '@shared/components/table-container/table-container.component';
import { TableColumn } from '@shared/models/ui.model';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [NgbPagination, AsyncPipe, TableContainerComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  public page = 1;
  public pageSize = 5;
  public total$: Observable<number>;
  public staffs = [
    {
      name: 'John Doe',
      email: 'john@example.com',
      gender: 'Male',
      role: 'Teacher',
      recentActivity: 'Logged in 2 days ago',
    },
    {
      name: 'Jane Smith',
      email: 'jane@example.com',
      gender: 'Female',
      role: 'Administrator',
      recentActivity: 'Logged in 5 days ago',
    },
    {
      name: 'Alice Johnson',
      email: 'alice@example.com',
      gender: 'Female',
      role: 'Teacher',
      recentActivity: 'Logged in 1 week ago',
    },
    {
      name: 'Bob Brown',
      email: 'bob@example.com',
      gender: 'Male',
      role: 'Teacher',
      recentActivity: 'Logged in 3 days ago',
    },
    {
      name: 'Charlie Davis',
      email: 'charlie@example.com',
      gender: 'Male',
      role: 'Teacher',
      recentActivity: 'Logged in 1 day ago',
    },
  ];
  public columns: TableColumn[] = [
    { name: 'Name' },
    { name: 'Email Address' },
    { name: 'Gender' },
    { name: 'Role' },
    { name: 'Recent Activity' },
    { name: '' },
  ];

  constructor() {
    this.total$ = of(this.staffs.length);
  }
}
