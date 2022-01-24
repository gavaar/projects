import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElementsPreviewComponent } from './elements-preview.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    ElementsPreviewComponent,
  ],
  exports: [
    ElementsPreviewComponent,
  ],
})
export class ElementsPreviewModule {}
