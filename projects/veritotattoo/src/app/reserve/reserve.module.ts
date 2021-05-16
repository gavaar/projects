import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VeroReserveComponent } from './reserve.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: VeroReserveComponent }]),
  ],
  declarations: [VeroReserveComponent]
})
export class VeroReserveModule {}
