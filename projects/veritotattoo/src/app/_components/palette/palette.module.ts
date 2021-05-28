import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaletteDirective } from './palette.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [PaletteDirective],
  exports: [PaletteDirective],
})
export class PaletteModule {}
