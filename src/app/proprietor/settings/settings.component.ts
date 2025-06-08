import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainLayoutComponent } from '@shared/components/layouts/main-layout/main-layout.component';

@Component({
  selector: 'app-settings',
  imports: [MainLayoutComponent, RouterOutlet],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {}
