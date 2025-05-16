import { Injectable } from '@angular/core';
import { UISettings } from '@shared/models/ui.model';
import { BehaviorSubject } from 'rxjs';

const UI_SETTINGS_KEY = 'ui-settings';
const DEFAULT_SETTINGS: UISettings = {
  isSidebarOpen: false,
  isSidebarCollapsed: false,
};

@Injectable({
  providedIn: 'root',
})
export class UiService {
  private settings = new BehaviorSubject(DEFAULT_SETTINGS);
  public settings$ = this.settings.asObservable();

  constructor() {
    const savedSettings = localStorage.getItem(UI_SETTINGS_KEY);
    if (savedSettings) {
      try {
        this.settings.next(JSON.parse(savedSettings));
      } catch (error) {
        console.error('Error parsing UI settings from localStorage', error);
      }
    }
  }

  saveSettings(settings: Partial<UISettings>) {
    const currentSettings = this.settings.getValue();
    const updatedSettings = {
      ...currentSettings,
      ...settings,
    };
    this.settings.next(updatedSettings);
    localStorage.setItem(UI_SETTINGS_KEY, JSON.stringify(settings));
  }
}
