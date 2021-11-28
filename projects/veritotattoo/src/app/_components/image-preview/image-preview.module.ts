import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { ImagePreviewDirective } from './image-preview.directive';
import { PreviewComponent } from './preview/image-preview.component';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
  ],
  declarations: [
    ImagePreviewDirective,
    PreviewComponent,
  ],
  exports: [
    ImagePreviewDirective,
  ]
})
export class ImagePreviewModule {}