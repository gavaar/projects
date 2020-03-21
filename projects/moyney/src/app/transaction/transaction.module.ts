import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MoyButtonModule } from '@libs/moy-button/moy-button.module';
import { MoyInputModule } from '@libs/moy-input/moy-input.module';
import { TransactionAddComponent } from './transaction-add/transaction-add.component';
import { TransactionService } from './transaction.service';

@NgModule({
  imports: [CommonModule, MoyButtonModule, MoyInputModule],
  declarations: [TransactionAddComponent],
  exports: [TransactionAddComponent],
  providers: [TransactionService],
})
export class TransactionModule {}
