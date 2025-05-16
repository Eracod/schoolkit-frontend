import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { SvgIconComponent } from '@shared/components/svg-icon/svg-icon.component';
import { Menu, MenuItem } from '@shared/models/menu.model';
import { AvatarComponent } from '../../avatar/avatar.component';
import { LogoComponent } from '../../logo/logo.component';
import { UiService } from '@shared/services/ui.service';
import { SearchComponent } from '@shared/components/search/search.component';

@Component({
  selector: 'app-main-layout',
  imports: [
    RouterLink,
    SvgIconComponent,
    NgbTooltipModule,
    AvatarComponent,
    LogoComponent,
    SearchComponent,
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent implements OnInit {
  public menu: Menu = {
    items: [
      { title: 'Dashboard', icon: 'home', route: '/dashboard' },
      { title: 'School Management', icon: 'books', route: '/schools' },
      { title: 'Payments', icon: 'credit-card', route: '/payments' },
      { title: 'Staffs', icon: 'person', route: '/staffs' },
      { title: 'Students', icon: 'school', route: '/students' },
      { title: 'Settings', icon: 'cog', route: '/setting' },
      { title: 'Help Center', icon: 'question-circle', route: '/help' },
    ],
  };
  activeMenuItem: MenuItem = this.menu.items[0];
  public isSidebarOpen = false;
  public isSidebarCollapsed = false;

  constructor(private readonly uiService: UiService) {}

  ngOnInit(): void {
    this.uiService.settings$.subscribe((settings) => {
      this.isSidebarOpen = settings.isSidebarOpen;
      this.isSidebarCollapsed = settings.isSidebarCollapsed;
    });
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    this.uiService.saveSettings({ isSidebarOpen: this.isSidebarOpen });
  }

  toggleSidebarCollapse() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
    this.uiService.saveSettings({
      isSidebarCollapsed: this.isSidebarCollapsed,
    });
  }
}
