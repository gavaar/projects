import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { RouterModule } from '@angular/router';
import { MoyButtonModule } from '@libs/moy-button';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: AdminComponent }]),
    MoyButtonModule,
  ],
  declarations: [AdminComponent]
})
export class AdminModule {}
