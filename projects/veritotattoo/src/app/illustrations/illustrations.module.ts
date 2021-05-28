import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IllustrationsComponent } from './illustrations.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: IllustrationsComponent }])
  ],
  declarations: [IllustrationsComponent],
})
export class IllustrationsModule {}
