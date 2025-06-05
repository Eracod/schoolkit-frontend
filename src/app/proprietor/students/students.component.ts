import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainLayoutComponent } from '@shared/components/layouts/main-layout/main-layout.component';

@Component({
  selector: 'app-students',
  imports: [MainLayoutComponent, RouterOutlet],
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss',
})
export class StudentsComponent {}
