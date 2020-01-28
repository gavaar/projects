import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MoyButtonModule } from '@libs/moy-button/moy-button.module';
import { MoyCardModule } from '@libs/moy-card/moy-card.module';
import { MoyInputModule } from '@libs/moy-input/moy-input.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [CommonModule, HomeRoutingModule, MoyCardModule, MoyButtonModule, MoyInputModule],
  declarations: [HomeComponent],
})
export class HomeModule {}
