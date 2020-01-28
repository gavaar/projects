import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormArray } from '@angular/forms';
import * as config from './transaction-add.config';

@Component({
  selector: 'moy-transaction-add',
  templateUrl: './transaction-add.component.html',
  styleUrls: ['./transaction-add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionAddComponent {
  inputs = config.inputs;
  buttons = config.buttons;

  private _form = new FormArray(Object.values(this.inputs).map(i => i.control));

  onAdd() {
    if (!this._form.valid) {
      this._form.controls.forEach(control => control.markAsDirty());
      console.log(this._form);
    }
  }
}
