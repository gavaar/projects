import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MoyTableComponent } from './moy-table.component';
import { MoyInputModule } from '@libs/moy-input/moy-input.module';

@NgModule({
  imports: [CommonModule, MatTableModule, MoyInputModule],
  declarations: [MoyTableComponent],
  exports: [MoyTableComponent],
})
export class MoyTableModule {}
