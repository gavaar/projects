import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as config from './transaction-add.config';
import { TransactionAddService } from './transaction-add.service';

export interface Income {
  description: string;
  amount: number;
  tags: string;
}

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

  private _form = new FormGroup(
    Object.keys(this.inputs).reduce((group, i) => {
      group[i] = this.inputs[i].control;
      return group;
    }, {}),
  );

  get formValid(): boolean {
    return this._form.valid;
  }

  constructor(private service: TransactionAddService) {}

  onAdd() {
    if (this.formValid) {
      this.service.submitTransaction(this._form.value);
    }
  }
}
