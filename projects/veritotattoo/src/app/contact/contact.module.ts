import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VeroContactComponent } from './contact.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: VeroContactComponent }])
  ],
  declarations: [VeroContactComponent],
})
export class VeroContactModule {}
