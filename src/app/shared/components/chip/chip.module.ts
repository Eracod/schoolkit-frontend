import { NgModule } from '@angular/core';
import { ChipGridComponent } from './chip-grid/chip-grid.component';
import { ChipItemComponent } from './chip-item/chip-item.component';
import { ChipInputForDirective } from './chip-input-for.directive';

const components = [
  ChipGridComponent,
  ChipItemComponent,
  ChipInputForDirective,
];

@NgModule({
  declarations: components,
  exports: components,
  imports: [],
})
export class ChipModule {}
