import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ConfigComponent } from './config.component';
import { ElementsPreviewModule } from './elements-preview/elements-preview.module';
import { MoyButtonModule } from '@libs/moy-button';
import { MoyInputModule } from '@libs/moy-input';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: ConfigComponent }]),
    ElementsPreviewModule,
    MoyButtonModule,
    MoyInputModule,
  ],
  declarations: [
    ConfigComponent,
  ]
})
export class ConfigModule { }
