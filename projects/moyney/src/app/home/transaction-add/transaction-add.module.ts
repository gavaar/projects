import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MoyButtonModule } from '@libs/moy-button/moy-button.module';
import { MoyInputModule } from '@libs/moy-input/moy-input.module';
import { TransactionAddComponent } from './transaction-add.component';

@NgModule({
  imports: [CommonModule, MoyButtonModule, MoyInputModule],
  declarations: [TransactionAddComponent],
  exports: [TransactionAddComponent],
})
export class TransactionAddModule {}
