import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MoyImagePreviewModule } from '@libs/moy-image-preview';
import { ImageStorageService } from '@vero-components/image-storage';
import { TattooComponent } from './tattoo.component'
import { TattooService } from './tattoo.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: TattooComponent }]),
    MoyImagePreviewModule,
  ],
  declarations: [TattooComponent],
  providers: [ImageStorageService, TattooService]
})
export class TattooModule { }
