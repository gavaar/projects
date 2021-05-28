import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoyScrollbarDirective } from './moy-scrollbar.directive';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    MoyScrollbarDirective
  ],
  exports: [
    MoyScrollbarDirective
  ]
})
export class MoyScrollbarModule {}
