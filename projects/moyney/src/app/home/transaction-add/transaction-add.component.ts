import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormArray } from '@angular/forms';
import * as config from './transaction-add.config';
import { TransactionAddService } from './transaction-add.service';

@Component({
  selector: 'moy-transaction-add',
  templateUrl: './transaction-add.component.html',
  styleUrls: ['./transaction-add.component.scss'],
  providers: [TransactionAddService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionAddComponent {
  inputs = config.inputs;
  buttons = config.buttons;

  private _form = new FormArray(Object.values(this.inputs).map(i => i.control));

  get formValid(): boolean {
    return this._form.valid;
  }

  constructor(private service: TransactionAddService) {}

  onAdd() {
    if (this.formValid) {
      console.log(this._form, 'is valid');
      this.service.getTransactions();
    }
  }
}
