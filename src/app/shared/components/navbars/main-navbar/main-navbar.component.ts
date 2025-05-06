import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LogoComponent } from '@shared/components/logo/logo.component';
import { SvgIconComponent } from '@shared/components/svg-icon/svg-icon.component';
import { MenuItem } from '@shared/models/menu.model';
import { AvatarComponent } from '../../avatar/avatar.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { KycOverviewComponent } from '@shared/components/kyc/kyc-overview/kyc-overview.component';

@Component({
  selector: 'app-main-navbar',
  imports: [LogoComponent, SvgIconComponent, AvatarComponent, RouterLink],
  templateUrl: './main-navbar.component.html',
  styleUrl: './main-navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainNavbarComponent implements OnInit {
  @ViewChild('navbarTemplate', { static: true })
  navbarTemplate!: TemplateRef<any>;
  @ViewChild('navbar', { static: false })
  navbar!: ElementRef<HTMLElement>;
  public menuItems: MenuItem[] = [
    {
      icon: '3d-square',
      name: 'Dashboard',
      route: '/dashboard',
    },
    {
      icon: 'money-send',
      name: 'Budgeting',
      route: '/budget',
    },
    {
      icon: 'wallet-minus',
      name: 'Wallet',
      route: '/wallet',
    },
    {
      icon: 'percentage-square',
      name: 'Offer',
      route: '/offer',
    },
    {
      icon: 'book',
      name: 'FinHub',
      route: '/fin-hub',
    },
  ];
  public activeMenuItem?: MenuItem;

  constructor(
    private readonly viewContainerRef: ViewContainerRef,
    private readonly router: Router,
    private readonly modal: NgbModal
  ) {}

  ngOnInit(): void {
    this.viewContainerRef.createEmbeddedView(this.navbarTemplate);
    this.viewContainerRef.element.nativeElement.remove();

    window.onscroll = () => {
      const navbar = this.navbar.nativeElement;
      if (!navbar) return;
      if (document.documentElement.scrollTop > 20) {
        navbar.classList.add('navbar-scroll');
      } else {
        navbar.classList.remove('navbar-scroll');
      }
    };

    this.activeMenuItem = this.menuItems.find(
      (d) => d.route === this.router.url
    );
  }

  goto(url: string) {
    this.router.navigateByUrl(url);
  }

  public openKYC(): void {
    const instance = this.modal.open(KycOverviewComponent, {
      size: 'lg',
      scrollable: true,
      centered: true,
      modalDialogClass: 'modal-rounded',
    });
  }
}
