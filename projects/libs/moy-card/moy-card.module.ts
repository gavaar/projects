import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MoyButtonModule } from '@libs/moy-button/moy-button.module';
import { MoyCardComponent } from './moy-card.component';

@NgModule({
  imports: [CommonModule, MoyButtonModule, MatIconModule],
  declarations: [MoyCardComponent],
  exports: [MoyCardComponent],
})
export class MoyCardModule {}
