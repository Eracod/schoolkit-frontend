import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { SchoolSession } from '@shared/models/school.model';
import { TableColumn } from '@shared/models/ui.model';
import { Observable, of } from 'rxjs';
import { TableContainerComponent } from '../../../shared/components/table-container/table-container.component';

@Component({
  selector: 'app-sessions',
  imports: [NgbPagination, AsyncPipe, TableContainerComponent],
  templateUrl: './sessions.component.html',
  styleUrl: './sessions.component.scss',
})
export class SessionsComponent {
  public tabIndex = 0;
  public columns: TableColumn[] = [
    { name: 'Session' },
    { name: 'Term' },
    { name: 'Status' },
    { name: 'Start' },
    { name: 'End' },
    { name: '' },
  ];
  public sessions: SchoolSession[] = [
    {
      endAt: `2025/06/24`,
      session: `2024/2025`,
      startAt: `2025/01/12`,
      status: 'Ongoing',
      term: `First`,
    },
    {
      endAt: `2025/06/24`,
      session: `2024/2025`,
      startAt: `2025/01/12`,
      status: 'Done',
      term: `Second`,
    },
    {
      endAt: `2025/06/24`,
      session: `2024/2025`,
      startAt: `2025/01/12`,
      status: 'Done',
      term: `Third`,
    },
    {
      endAt: `2025/06/24`,
      session: `2024/2025`,
      startAt: `2025/01/12`,
      status: 'Ongoing',
      term: `First`,
    },
    {
      endAt: `2025/06/24`,
      session: `2024/2025`,
      startAt: `2025/01/12`,
      status: 'Done',
      term: `Second`,
    },
    {
      endAt: `2025/06/24`,
      session: `2024/2025`,
      startAt: `2025/01/12`,
      status: 'Done',
      term: `Third`,
    },
    {
      endAt: `2025/06/24`,
      session: `2024/2025`,
      startAt: `2025/01/12`,
      status: 'Ongoing',
      term: `First`,
    },
    {
      endAt: `2025/06/24`,
      session: `2024/2025`,
      startAt: `2025/01/12`,
      status: 'Done',
      term: `Second`,
    },
    {
      endAt: `2025/06/24`,
      session: `2024/2025`,
      startAt: `2025/01/12`,
      status: 'Done',
      term: `Third`,
    },
  ];
  public page = 1;
  public pageSize = 5;
  public total$: Observable<number>;

  constructor() {
    this.total$ = of(this.sessions.length);
  }
}
