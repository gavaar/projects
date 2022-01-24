import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MoyImagePreviewDirective } from './moy-image-preview.directive';
import { MoyImagePreviewComponent } from './moy-preview/moy-image-preview.component';

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
  ]
})
export class MoyImagePreviewModule {}