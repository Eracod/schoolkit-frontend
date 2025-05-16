import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgIconRegistryService } from './services/svg-icon-registry.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { IconDefinitions } from './models';

const baseUrl = `icons/svg`;
@Component({
  selector: 'app-svg-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './svg-icon.component.html',
  styleUrls: ['./svg-icon.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class SvgIconComponent implements OnInit, OnChanges {
  @Input({ required: true }) icon!: IconDefinitions;
  @Input({ alias: 'class' }) iconClass = '';
  @Input() size = 24;
  @Input({ alias: 'width' }) sizeWidth?: number;
  @Input({ alias: 'height' }) sizeHeight?: number;
  @Input() color = 'currentColor';

  @ViewChild('svgTemplate', { static: true }) svgTemplate!: TemplateRef<any>;

  public svg: SafeHtml = '';
  public width = `${this.size}px`;
  public height = `${this.size}px`;

  constructor(
    private svgIconRegistry: SvgIconRegistryService,
    private readonly viewContainer: ViewContainerRef,
    private readonly cdr: ChangeDetectorRef,
    private readonly sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.viewContainer.createEmbeddedView(this.svgTemplate);
    this.viewContainer.element.nativeElement.remove();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.registerIcon();
    this.width = `${this.sizeWidth ?? this.size}px`;
    this.height = `${this.sizeHeight ?? this.size}px`;
  }

  addIcon() {
    if (!this.icon) return;
    this.svgIconRegistry.getIcon(this.icon).subscribe({
      next: (iconHTML) => {
        if (iconHTML) {
          this.svg = iconHTML;
          this.cdr.detectChanges();
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  registerIcon() {
    const icon = this.icon;
    const url = this.sanitizer.bypassSecurityTrustResourceUrl(
      `${baseUrl}/${icon}.svg`
    );
    this.svgIconRegistry.addIcon(icon, url);
    this.addIcon();
  }
}
