import { IconDefinitions } from '@shared/components/svg-icon/models';

export interface MenuItem {
  title: string;
  icon: IconDefinitions;
  route: string;
}

export interface Menu {
  items: MenuItem[];
}
