import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TattooComponent } from './tattoo.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: TattooComponent }])
  ],
  declarations: [TattooComponent],
})
export class TattooModule {}
