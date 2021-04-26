import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UploaderRoutingModule } from './uploader-routing.module';
import { UploaderComponent } from './uploader.component';
import { MoyTableModule } from '@libs/moy-table';
import { MoyInputModule } from '@libs/moy-input';
import { UploaderSidebarComponent } from './uploader-sidebar/uploader-siderbar.component';
import { MoyButtonModule } from '@libs/moy-button';

@NgModule({
  imports: [
    CommonModule,
    UploaderRoutingModule,
    ReactiveFormsModule,
    MoyTableModule,
    MoyInputModule,
    MoyButtonModule,
  ],
  declarations: [UploaderComponent, UploaderSidebarComponent],
})
export class UploaderModule {}
