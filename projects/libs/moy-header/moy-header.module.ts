import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MoyButtonModule } from '../moy-button/moy-button.module';
import { MoyHeaderComponent } from './moy-header.component';

@NgModule({
  imports: [CommonModule, MoyButtonModule, MatIconModule],
  declarations: [MoyHeaderComponent],
  exports: [MoyHeaderComponent],
})
export class MoyHeaderModule {}
