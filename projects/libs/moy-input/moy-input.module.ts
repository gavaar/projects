import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MoyInputComponent } from './moy-input.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [MoyInputComponent],
  exports: [MoyInputComponent],
})
export class MoyInputModule {}
