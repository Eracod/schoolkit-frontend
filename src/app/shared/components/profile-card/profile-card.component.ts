import { Component, Input } from '@angular/core';
import { IconDefinitions } from '../svg-icon/models';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';

@Component({
  selector: 'app-profile-card',
  imports: [SvgIconComponent],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss',
})
export class ProfileCardComponent {
  @Input() src = '';
  @Input() name = '';
  @Input() designation = '';
  @Input() badgeIcon: IconDefinitions = 'award';
}
