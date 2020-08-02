import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MoyTableModule } from '@libs/moy-table/moy-table.module';
import { RecentlyAddedComponent } from './recently-added.component';

@NgModule({
  imports: [CommonModule, RouterModule.forChild([{ path: '', component: RecentlyAddedComponent }]), MoyTableModule],
  declarations: [RecentlyAddedComponent],
})
export class RecentlyAddedModule {}
