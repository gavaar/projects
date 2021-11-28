import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MoyButtonModule } from '@libs/moy-button';
import { MoyInputModule } from '@libs/moy-input';
import { MoyConfirmClickModule } from '@libs/moy-confirm-click';
import { UploaderComponent } from './uploader.component';
import { ImageCardModule } from './__components/image-card/image-card.module';
import { ImageManagerComponent } from './__components/image-manager/image-manager.component';
import { ImagesOptionsComponent } from './__components/image-options/image-options.component';
import { BulkOptionsComponent } from './__components/image-manager/__bulk-options/bulk-options.component';
import { UploaderFeedbackComponent } from './__uploader-feedback/uploader-feedback.component';
import { ImagePreviewModule } from '../../_components/image-preview/image-preview.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: UploaderComponent }]),
    ImagePreviewModule,
    MoyButtonModule,
    MoyInputModule,
    MoyConfirmClickModule,
    MatIconModule,
    ImageCardModule,
    MatProgressSpinnerModule,
  ],
  declarations: [
    UploaderComponent,
    ImageManagerComponent,
    UploaderFeedbackComponent,
    ImagesOptionsComponent,
    BulkOptionsComponent,
  ]
})
export class UploaderModule {}
