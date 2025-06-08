import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { SvgIconComponent } from '@shared/components/svg-icon/svg-icon.component';
import { Menu, MenuItem } from '@shared/models/menu.model';
import { AvatarComponent } from '../../avatar/avatar.component';
import { LogoComponent } from '../../logo/logo.component';
import { UiService } from '@shared/services/ui.service';
import { SearchComponent } from '@shared/components/search/search.component';
import { Store } from '@ngrx/store';
import * as AuthStore from '@store/auth';

@Component({
  selector: 'app-main-layout',
  imports: [
    RouterLink,
    SvgIconComponent,
    NgbTooltipModule,
    AvatarComponent,
    LogoComponent,
    SearchComponent,
    RouterLinkActive,
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent implements OnInit {
  public menu: Menu = {
    items: [
      { title: 'Dashboard', icon: 'home', route: '/proprietor' },
      {
        title: 'School Management',
        icon: 'books',
        route: '/proprietor/school-manager',
      },
      { title: 'Payments', icon: 'credit-card', route: '/payments' },
      { title: 'Staffs', icon: 'person', route: '/proprietor/staffs' },
      { title: 'Students', icon: 'school', route: '/proprietor/students' },
      { title: 'Settings', icon: 'cog', route: '/proprietor/settings' },
      { title: 'Help Center', icon: 'question-circle', route: '/help' },
    ],
  };
  activeMenuItem: MenuItem = this.menu.items[0];
  public isSidebarOpen = false;
  public isSidebarCollapsed = false;

  constructor(
    private readonly router: Router,
    private readonly store: Store,
    private readonly uiService: UiService
  ) {}

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

  logout() {
    this.store.dispatch(AuthStore.Logout());
    this.router.navigateByUrl('/');
  }
}
