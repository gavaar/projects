import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MoyImagePreviewDirective } from './moy-image-preview.directive';
import { MoyImagePreviewComponent } from './moy-preview/moy-image-preview.component';
import { MoyImagePreviewCacheService } from './moy-image-preview-cache.service';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
  ],
  declarations: [
    MoyImagePreviewDirective,
    MoyImagePreviewComponent,
  ],
  exports: [
    MoyImagePreviewDirective,
  ],
  providers: [
    MoyImagePreviewCacheService
  ]
})
export class MoyImagePreviewModule {}
