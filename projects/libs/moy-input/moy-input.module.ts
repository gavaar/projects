import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MoyInputComponent } from './moy-input.component';
import { MoySelectComponent, MoyTypedInputComponent } from './inputs';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [MoyInputComponent, MoySelectComponent, MoyTypedInputComponent],
  exports: [MoyInputComponent],
})
export class MoyInputModule {}
