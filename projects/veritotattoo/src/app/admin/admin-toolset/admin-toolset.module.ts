import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminToolsetComponent } from './admin-toolset.component';
import { MoyButtonModule } from '@libs/moy-button';

@NgModule({
  imports: [CommonModule, MoyButtonModule],
  declarations: [AdminToolsetComponent],
  exports: [AdminToolsetComponent],
})
export class AdminToolsetModule {}
