import { HttpClient } from '@angular/common/http';
import { Injectable, SecurityContext } from '@angular/core';
import {
  DomSanitizer,
  SafeHtml,
  SafeResourceUrl,
} from '@angular/platform-browser';
import { map, Observable, of, shareReplay } from 'rxjs';

interface IconRegistry {
  [x: string]: {
    url: SafeResourceUrl;
    html?: SafeHtml;
  };
}

@Injectable({
  providedIn: 'root',
})
export class SvgIconRegistryService {
  private icons: IconRegistry = {};
  private loader: { [x: string]: Observable<any> } = {};

  constructor(
    private readonly http: HttpClient,
    private readonly sanitizer: DomSanitizer
  ) {}

  public addIcon(iconName: string, url: SafeResourceUrl): void {
    if (this.icons[iconName]) return;
    this.icons[iconName] = { url };
  }

  public addIcons(icons: { iconName: string; url: SafeResourceUrl }[]): void {
    for (const icon of icons) {
      this.addIcon(icon.iconName, icon.url);
    }
  }

  public getIcon(iconName: string): Observable<SafeHtml | null> {
    const icon = this.icons[iconName];
    if (!icon) return of(null);
    if (icon.html) return of(icon.html);

    const url = this.sanitizer.sanitize(SecurityContext.RESOURCE_URL, icon.url);
    if (!url) return of(null);
    if (this.loader[url]) {
      return this.loader[url];
    }

    this.loader[url] = this.http.get(url, { responseType: 'text' }).pipe(
      shareReplay(1),
      map((response) => {
        const safeHtml = this.sanitizer.bypassSecurityTrustHtml(response);
        this.icons[iconName] = { ...icon, html: safeHtml };
        delete this.loader[url];
        return safeHtml;
      })
    );
    return this.loader[url];
  }
}
