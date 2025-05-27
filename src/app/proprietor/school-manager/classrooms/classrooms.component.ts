import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { SchoolClass } from '@shared/models/school.model';
import { TableColumn } from '@shared/models/ui.model';
import { Observable, of } from 'rxjs';
import { TableContainerComponent } from '@shared/components/table-container/table-container.component';

@Component({
  selector: 'app-classrooms',
  imports: [NgbPagination, AsyncPipe, TableContainerComponent],
  templateUrl: './classrooms.component.html',
  styleUrl: './classrooms.component.scss',
})
export class ClassroomsComponent {
  public tabIndex = 1;
  public columns: TableColumn[] = [
    { name: 'Class' },
    { name: 'No. of Students' },
    { name: 'Form Teacher' },
    { name: '' },
  ];
  public classes: SchoolClass[] = [
    { name: 'JSS 1A', studentCount: 20, teacher: { name: 'Anna Mercy' } },
    { name: 'JSS 1B', studentCount: 10, teacher: { name: 'Andrew Philips' } },
    { name: 'JSS 2A', studentCount: 30, teacher: { name: 'Anna Mercy' } },
    { name: 'JSS 2B', studentCount: 20, teacher: { name: 'Anna Mercy' } },
    { name: 'JSS 3A', studentCount: 20, teacher: { name: 'Anna Mercy' } },
    { name: 'JSS 3B', studentCount: 10, teacher: { name: 'Andrew Philips' } },
    { name: 'SS 1A', studentCount: 30, teacher: { name: 'Anna Mercy' } },
    { name: 'SS 1B', studentCount: 20, teacher: { name: 'Anna Mercy' } },
    { name: 'SS 2A', studentCount: 20, teacher: { name: 'Anna Mercy' } },
    { name: 'SS 2B', studentCount: 10, teacher: { name: 'Andrew Philips' } },
    { name: 'SS 3A', studentCount: 30, teacher: { name: 'Anna Mercy' } },
    { name: 'SS 3B', studentCount: 20, teacher: { name: 'Anna Mercy' } },
  ];

  public page = 1;
  public pageSize = 5;
  public total$: Observable<number>;

  constructor() {
    this.total$ = of(this.classes.length);
  }
}
