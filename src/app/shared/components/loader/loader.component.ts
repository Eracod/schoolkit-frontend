import {
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';

@Component({
  selector: 'app-loader',
  imports: [],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent implements OnInit {
  @Input() loading = true;
  @Input() size = 15;
  @Input() color = 'currentColor';
  @ViewChild('loaderTemplate', { static: true })
  loaderTemplate!: TemplateRef<any>;

  constructor(private readonly viewContainer: ViewContainerRef) {}

  ngOnInit(): void {
    this.viewContainer.createEmbeddedView(this.loaderTemplate);
    this.viewContainer.element.nativeElement.remove();
  }
}
