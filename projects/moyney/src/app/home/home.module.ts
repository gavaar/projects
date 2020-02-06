import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MoyCardModule } from '@libs/moy-card/moy-card.module';
import { MoyTableModule } from '@libs/moy-table/moy-table.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { TransactionAddModule } from './transaction-add/transaction-add.module';

@NgModule({
  imports: [CommonModule, HomeRoutingModule, TransactionAddModule, MoyCardModule, MoyTableModule],
  declarations: [HomeComponent],
})
export class HomeModule {}
