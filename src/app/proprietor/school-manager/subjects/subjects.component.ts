import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { SchoolSubject } from '@shared/models/school.model';
import { TableColumn } from '@shared/models/ui.model';
import { Observable, of } from 'rxjs';
import { TableContainerComponent } from '@shared/components/table-container/table-container.component';

@Component({
  selector: 'app-subjects',
  imports: [NgbPagination, AsyncPipe, TableContainerComponent],
  templateUrl: './subjects.component.html',
  styleUrl: './subjects.component.scss',
})
export class SubjectsComponent {
  public tabIndex = 2;
  public columns: TableColumn[] = [
    { name: 'Subject' },
    { name: 'No. of Teachers' },
    { name: 'No. of Classes' },
    { name: 'No. of Students' },
    { name: '' },
  ];
  public subjects: SchoolSubject[] = [
    {
      classCount: 20,
      name: 'Mathematics',
      studentCount: 30,
      teacherCount: 10,
    },
    {
      classCount: 20,
      name: 'English',
      studentCount: 30,
      teacherCount: 10,
    },
    {
      classCount: 20,
      name: 'Biology',
      studentCount: 30,
      teacherCount: 10,
    },
    {
      classCount: 20,
      name: 'Physics',
      studentCount: 30,
      teacherCount: 10,
    },
    {
      classCount: 20,
      name: 'Fine Art',
      studentCount: 30,
      teacherCount: 10,
    },
    {
      classCount: 20,
      name: 'Social Studies',
      studentCount: 30,
      teacherCount: 10,
    },
  ];

  public page = 1;
  public pageSize = 5;
  public total$: Observable<number>;

  constructor() {
    this.total$ = of(this.subjects.length);
  }
}
