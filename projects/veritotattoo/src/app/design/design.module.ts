import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MoyImagePreviewModule } from '@libs/moy-image-preview';
import { ImageStorageService } from '@vero-components/image-storage';
import { DesignComponent } from './design.component'
import { DesignService } from './design.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: DesignComponent }]),
    MoyImagePreviewModule,
  ],
  declarations: [DesignComponent],
  providers: [ImageStorageService, DesignService]
})
export class DesignModule {}
