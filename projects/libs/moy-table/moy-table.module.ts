import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material';
import { MoyButtonModule } from '@libs/moy-button/moy-button.module';
import { MoyInputModule } from '@libs/moy-input/moy-input.module';
import { MoyTableComponent } from './moy-table.component';

@NgModule({
  imports: [CommonModule, MatTableModule, MoyInputModule, MoyButtonModule],
  declarations: [MoyTableComponent],
  exports: [MoyTableComponent],
})
export class MoyTableModule {}
