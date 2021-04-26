import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MoyTableComponent } from './moy-table.component';
import { MoyInputModule } from '@libs/moy-input/moy-input.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MoyInnerRowComponent } from './row';

@NgModule({
  imports: [CommonModule, MatTableModule, MoyInputModule, MatPaginatorModule],
  declarations: [MoyTableComponent, MoyInnerRowComponent],
  exports: [MoyTableComponent],
})
export class MoyTableModule {}
