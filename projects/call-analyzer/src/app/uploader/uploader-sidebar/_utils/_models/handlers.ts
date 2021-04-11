import { AbstractMoyInput, MoyDatepicker, MoyInput, MoyInputNumber } from '@libs/moy-input';
import { MoyTableFilter } from '@libs/moy-table-2/table/moy-table';
import { INPUT_APPENDS } from '../../uploader-sidebar.config';

export abstract class AbstractUploaderHandler {
  inputs: AbstractMoyInput<any>[];

  constructor(protected column: string) {
    this.inputs = this.buildInputs();
  }

  abstract filtersForMoyTable(): MoyTableFilter<any>['columns'][any];

  protected buildInputs(): AbstractUploaderHandler['inputs'] {
    throw ('Gotta override buildInputs method on extended Handler class');
  };
}

export class StringHandler extends AbstractUploaderHandler {
  filtersForMoyTable() {
    return (val: string) => val.includes(this.inputs[0].control.value);
  }

  protected buildInputs(): [MoyInput] {
    const opts = { label: 'Buscar', id: this.column, placeholder: `buscar en ${this.column}` };
    return [new MoyInput(opts)];
  }
}

export class NumberHandler extends AbstractUploaderHandler {
  filtersForMoyTable() {
    const lowerThanVal = +this.inputs[0].control.value;
    const higherThanVal = +this.inputs[1].control.value;
    if (!higherThanVal && !lowerThanVal) {
      return;
    }

    return (val: string) => {
      return (!lowerThanVal || +val <= lowerThanVal) &&
        (!higherThanVal || +val >= higherThanVal)
    };
  }

  protected buildInputs(): [MoyInputNumber, MoyInputNumber] {
    return [
      new MoyInputNumber({ id: `${this.column}::${INPUT_APPENDS.numberLowerThan}`, label: INPUT_APPENDS.numberLowerThan }),
      new MoyInputNumber({ id: `${this.column}::${INPUT_APPENDS.numberHigherThan}`, label: INPUT_APPENDS.numberHigherThan }),
    ];
  }
}

export class DateHandler extends AbstractUploaderHandler {
  filtersForMoyTable() {
    const { value } = this.inputs[0].control;
    const before = new Date(value.before);
    const after = new Date(value.after);

    return (val: string) => {
      const valueDate = new Date(val);
      return (!before || valueDate >= before) && (!after || valueDate <= after);
    }
  }

  protected buildInputs(): [MoyDatepicker] {
    return [new MoyDatepicker({
      id: `${this.column}::${INPUT_APPENDS.date}`,
      label: INPUT_APPENDS.date,
      placeholder: 'seleccione fecha',
    }),
    ];
  }
}
