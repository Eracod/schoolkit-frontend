import {
  Component,
  ElementRef,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LogoComponent } from '@shared/components/logo/logo.component';
import { SvgIconComponent } from '@shared/components/svg-icon/svg-icon.component';

@Component({
  selector: 'app-navbar',
  imports: [LogoComponent, SvgIconComponent, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  @ViewChild('navbarTemplate', { static: true })
  navbarTemplate!: TemplateRef<any>;
  @ViewChild('navbar', { static: false })
  navbar!: ElementRef<HTMLElement>;

  constructor(
    private readonly viewContainerRef: ViewContainerRef,
    private readonly router: Router
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
  }

  goto(url: string) {
    this.router.navigateByUrl(url);
  }
}
