import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MainLayoutComponent } from '@shared/components/layouts/main-layout/main-layout.component';
import { NavComponent } from '@shared/components/nav/nav.component';

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
export class SchoolManagerComponent {}
