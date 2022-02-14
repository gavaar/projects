import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElementsPreviewComponent } from './elements-preview.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
  ],
  declarations: [
    ElementsPreviewComponent,
  ],
  exports: [
    ElementsPreviewComponent,
  ],
})
export class ElementsPreviewModule {}
