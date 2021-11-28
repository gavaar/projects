import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigComponent } from './config.component';
import { RouterModule } from '@angular/router';
import { MoyButtonModule } from '@libs/moy-button';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: ConfigComponent }]),
    MoyButtonModule,
  ],
  declarations: [
    ConfigComponent,
  ]
})
export class ConfigModule { }
