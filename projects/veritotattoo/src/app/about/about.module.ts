import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VeroAboutComponent } from './about.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: VeroAboutComponent }])
  ],
  declarations: [VeroAboutComponent],
})
export class VeroAboutModule {}
