import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MoyLoadingBarModule } from '@libs/moy-loading-bar/moy-loading-bar.module';
import { SummaryComponent } from './summary.component';

@NgModule({
  imports: [CommonModule, RouterModule.forChild([{ path: '', component: SummaryComponent }]), MoyLoadingBarModule],
  declarations: [SummaryComponent],
})
export class SummaryModule {}
