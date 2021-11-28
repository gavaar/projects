import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ImageCardComponent } from './image-card.component';
import { MoyInputModule } from '@libs/moy-input';
import { ImagePreviewModule } from '@vero-components/image-preview/image-preview.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MoyInputModule,
    ImagePreviewModule,
  ],
  declarations: [ImageCardComponent],
  exports: [ImageCardComponent],
})
export class ImageCardModule {}
