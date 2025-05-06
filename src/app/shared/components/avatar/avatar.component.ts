import { Component, Input, OnInit, ViewContainerRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-avatar',
  imports: [NgTemplateOutlet],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.css',
})
export class AvatarComponent implements OnInit {
  @Input() src?: string;
  @Input() text?: string;
  @Input() size = 35;
  public isBrokenImage = false;

  constructor(private readonly containerRef: ViewContainerRef) {}

  ngOnInit(): void {
    const element = this.containerRef.element.nativeElement as HTMLElement;
    const fontSize = 0.4 * this.size;
    element.style.width = `${this.size}px`;
    element.style.height = `${this.size}px`;
    element.style.fontSize = `${fontSize}px`;
  }

  get initial() {
    return this.text?.substring(0, 1).toUpperCase();
  }
}
