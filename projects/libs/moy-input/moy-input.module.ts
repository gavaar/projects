import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MoyInputComponent } from './moy-input.component';
import { MoySelectComponent, MoySelectImageComponent, MoyTypedInputComponent, MoyDatePickerComponent, MoyFileComponent, MoyToggleComponent, MoyColorpickerComponent, MoyTextareaComponent } from './inputs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MoyImagePreviewModule } from '@libs/moy-image-preview';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, MatDatepickerModule, MatNativeDateModule, MoyImagePreviewModule],
  declarations: [
    MoyInputComponent,
    MoySelectComponent,
    MoySelectImageComponent,
    MoyTypedInputComponent,
    MoyDatePickerComponent,
    MoyFileComponent,
    MoyToggleComponent,
    MoyColorpickerComponent,
    MoyTextareaComponent,
  ],
  exports: [MoyInputComponent],
})
export class MoyInputModule {}
