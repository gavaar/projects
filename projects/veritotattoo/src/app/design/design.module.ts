import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DesignComponent } from './design.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: DesignComponent }])
  ],
  declarations: [DesignComponent],
})
export class DesignModule {}
