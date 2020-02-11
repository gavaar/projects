import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { parseDateReadable } from '../../_common/transform';
import { Income } from '../home.models';
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
  @Output() incomeAdded = new EventEmitter<Income>();

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

  constructor(private _service: TransactionAddService) {}

  onAdd() {
    if (this.formValid) {
      this._service.submitTransaction(this._form.value).subscribe(() => {
        this.incomeAdded.emit({ ...this._form.value, date: parseDateReadable(new Date()) });
        this._form.reset();
      });
    }
  }
}
