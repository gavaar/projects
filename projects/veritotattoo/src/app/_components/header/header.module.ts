import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicHeaderComponent } from './header.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MoyScrollbarModule } from '@libs/moy-scrollbar';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule,
    MoyScrollbarModule,
  ],
  declarations: [DynamicHeaderComponent],
  exports: [DynamicHeaderComponent],
})
export class DynamicHeaderModule {}
