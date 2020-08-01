import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Income } from '../transaction.models';
import { TransactionService } from '../transaction.service';
import * as config from './transaction-add.config';

@Component({
  selector: 'moy-transaction-add',
  templateUrl: './transaction-add.component.html',
  styleUrls: ['./transaction-add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionAddComponent implements OnInit {
  @Output() incomeAdded = new EventEmitter<Income>();
  @Output() valueChanges = new EventEmitter<Partial<Income>>();

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

  constructor(private _service: TransactionService) {}

  ngOnInit() {
    this._form.valueChanges.subscribe(changes => this.valueChanges.emit(changes));
  }

  onAdd() {
    if (this.formValid) {
      const formValue = { ...this._form.value };
      this._service.create(formValue).subscribe(
        newIncome => {
          this.incomeAdded.emit(newIncome);
          this.inputs.description.setFocus();
        },
        err => {
          this._form.patchValue(formValue);
          console.log({ err });
        },
      );
      this._form.reset();
    }
  }
}
