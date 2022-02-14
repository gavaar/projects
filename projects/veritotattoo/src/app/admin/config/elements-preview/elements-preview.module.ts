import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElementsPreviewComponent } from './elements-preview.component';
import { MatIconModule } from '@angular/material/icon';
import { PaletteModule } from '@vero-components/palette';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    PaletteModule,
  ],
  declarations: [
    ElementsPreviewComponent,
  ],
  exports: [
    ElementsPreviewComponent,
  ],
})
export class ElementsPreviewModule {}
