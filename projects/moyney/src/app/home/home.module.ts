import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MoyCardModule } from '@libs/moy-card/moy-card.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [CommonModule, HomeRoutingModule, MoyCardModule],
  declarations: [HomeComponent],
})
export class HomeModule {}
