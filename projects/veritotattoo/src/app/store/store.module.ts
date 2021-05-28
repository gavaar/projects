import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreComponent } from './store.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: StoreComponent }]),
  ],
  declarations: [StoreComponent]
})
export class StoreModule {}
