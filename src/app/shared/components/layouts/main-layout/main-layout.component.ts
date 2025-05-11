import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { SvgIconComponent } from '@shared/components/svg-icon/svg-icon.component';
import { Menu, MenuItem } from '@shared/models/menu.model';

@Component({
  selector: 'app-main-layout',
  imports: [RouterLink, SvgIconComponent, NgbTooltipModule],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {
  public menu: Menu = {
    items: [
      { title: 'Dashboard', icon: 'home', route: '/dashboard' },
      { title: 'School Management', icon: 'books', route: '/schools' },
      { title: 'Payments', icon: 'credit-card', route: '/payments' },
      { title: 'Staffs\t\t', icon: 'person', route: '/staffs' },
      { title: 'Students', icon: 'school', route: '/students' },
      { title: 'Settings', icon: 'cog', route: '/setting' },
      { title: 'Help Center', icon: 'question-circle', route: '/help' },
    ],
  };
  activeMenuItem: MenuItem = this.menu.items[0];

  toggleSidebar() {}
}
