import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MoyInputComponent } from './moy-input.component';
import {
  MoySelectComponent, MoySelectImageComponent, MoyTypedInputComponent, MoyDatePickerComponent, MoyFileComponent, MoyToggleComponent, MoyColorpickerComponent, MoyTextareaComponent,
  MoySelectIconComponent, MoySelectIconService
} from './inputs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MoyImagePreviewModule } from '@libs/moy-image-preview';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, MatIconModule, MatDatepickerModule, MatNativeDateModule, MoyImagePreviewModule],
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
    MoySelectIconComponent,
  ],
  exports: [MoyInputComponent],
  providers: [MoySelectIconService]
})
export class MoyInputModule {}
