import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OptionsComponent } from './options.component';
import { RouterModule, Routes } from '@angular/router';
import { MoyButtonModule } from '@libs/moy-button';
import { AdminToolsetModule } from '../admin-toolset/admin-toolset.module';

const routes: Routes = [
  { path: '', component: OptionsComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MoyButtonModule,
    AdminToolsetModule,
  ],
  declarations: [OptionsComponent],
})
export class OptionsModule { }
