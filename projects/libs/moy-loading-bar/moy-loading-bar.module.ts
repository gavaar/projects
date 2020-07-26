import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MoyLoadingBarComponent } from './moy-loading-bar.component';

@NgModule({
  imports: [CommonModule],
  declarations: [MoyLoadingBarComponent],
  exports: [MoyLoadingBarComponent],
})
export class MoyLoadingBarModule {}
