import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UploaderRoutingModule } from './uploader-routing.module';
import { UploaderComponent } from './uploader.component';
import { MoyTableModule } from '@libs/moy-table-2/moy-table.module';

@NgModule({
  imports: [
    CommonModule,
    UploaderRoutingModule,
    ReactiveFormsModule,
    MoyTableModule
  ],
  declarations: [UploaderComponent],
})
export class UploaderModule {}
