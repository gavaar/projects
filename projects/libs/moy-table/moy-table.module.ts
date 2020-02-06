import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MoyTableComponent } from './moy-table.component';

@NgModule({
  imports: [CommonModule],
  declarations: [MoyTableComponent],
  exports: [MoyTableComponent],
})
export class MoyTableModule {}
