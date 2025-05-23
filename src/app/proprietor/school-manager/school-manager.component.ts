import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MainLayoutComponent } from '@shared/components/layouts/main-layout/main-layout.component';
import { NavComponent } from '@shared/components/nav/nav.component';
import { SessionFormComponent } from './sessions/modals/session-form/session-form.component';
import { ClassFormComponent } from './classrooms/modals/class-form/class-form.component';
import { SubjectFormComponent } from './subjects/modals/subject-form/subject-form.component';

enum SchoolManagerTabs {
  Session,
  Class,
  Subject,
}

@Component({
  selector: 'app-school-manager',
  imports: [
    MainLayoutComponent,
    NavComponent,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './school-manager.component.html',
  styleUrl: './school-manager.component.scss',
})
export class SchoolManagerComponent {
  public SchoolManagerTabs = SchoolManagerTabs;
  public activeTab = SchoolManagerTabs.Session;

  constructor(private readonly modal: NgbModal) {}

  createSession() {
    this.modal.open(SessionFormComponent, {
      size: 'lg',
      centered: true,
      scrollable: true,
      backdrop: 'static',
    });
  }

  createClass() {
    this.modal.open(ClassFormComponent, {
      size: 'sm',
      centered: true,
      scrollable: true,
      backdrop: 'static',
    });
  }

  createSubject() {
    this.modal.open(SubjectFormComponent, {
      size: 'md',
      centered: true,
      scrollable: true,
      backdrop: 'static',
    });
  }

  onRouteActivated(component: any) {
    this.activeTab = component.tabIndex;
  }
}
