import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MoyFooterComponent } from './moy-footer.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [MoyFooterComponent],
  exports: [MoyFooterComponent],
})
export class MoyFooterModule {}
