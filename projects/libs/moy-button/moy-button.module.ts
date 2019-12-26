import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material';
import { MoyButtonComponent } from './moy-button.component';

@NgModule({
  imports: [CommonModule, MatIconModule],
  declarations: [MoyButtonComponent],
  exports: [MoyButtonComponent],
})
export class MoyButtonModule {}
