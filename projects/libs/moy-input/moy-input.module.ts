import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MoyInputComponent } from './moy-input.component';
import { MoySelectComponent, MoySelectImageComponent, MoyTypedInputComponent, MoyDatePickerComponent, MoyFileComponent, MoyToggleComponent, MoyColorpickerComponent, MoyTextareaComponent } from './inputs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, MatDatepickerModule, MatNativeDateModule],
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
