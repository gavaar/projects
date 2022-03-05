import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ImageCardComponent } from './image-card.component';
import { MoyInputModule } from '@libs/moy-input';
import { MoyImagePreviewModule } from '@libs/moy-image-preview';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MoyInputModule,
    MoyImagePreviewModule,
  ],
  declarations: [ImageCardComponent],
  exports: [ImageCardComponent],
})
export class ImageCardModule {}
