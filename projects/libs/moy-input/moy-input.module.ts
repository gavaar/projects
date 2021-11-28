import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MoyInputComponent } from './moy-input.component';
import { MoySelectComponent, MoyTypedInputComponent, MoyDatePickerComponent, MoyFileComponent, MoyToggleComponent } from './inputs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, MatDatepickerModule, MatNativeDateModule],
  declarations: [
    MoyInputComponent,
    MoySelectComponent,
    MoyTypedInputComponent,
    MoyDatePickerComponent,
    MoyFileComponent,
    MoyToggleComponent,
  ],
  exports: [MoyInputComponent],
})
export class MoyInputModule {}
