import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MoyButtonModule } from '../moy-button/moy-button.module';
import { MoyHeaderComponent } from './moy-header.component';

@NgModule({
  imports: [CommonModule, MoyButtonModule],
  declarations: [MoyHeaderComponent],
  exports: [MoyHeaderComponent],
})
export class MoyHeaderModule {}
