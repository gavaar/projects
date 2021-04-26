import { MoyCell } from '../cell/moy-cell';
import { MoyRowConfig } from './interfaces';

export abstract class AbstractMoyRow<Model> {
  columns: (keyof Model)[] = [];
  cellMap: { [col in keyof Model]?: MoyCell<Model[keyof Model]> } = {};

  get value(): Model {
    return this._value;
  }
  set value(v: Model) {
    this._value = v;
  }
  private _value: Model;

  constructor(config: MoyRowConfig<Model>) {
    this._value = config.value;
    this.columns = Object.keys(config.columns) as (keyof Model)[];
    this.columns.forEach(k => {
      const { class: Builder, controlOptions } = config.columns[k as keyof Model];
      const cell = new MoyCell({ class: Builder, value: config.value[k], controlOptions });
      this.cellMap[k] = cell;
    });
  }
}
