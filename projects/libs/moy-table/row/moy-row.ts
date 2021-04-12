import { MoyCell } from '../cell/moy-cell';
import { MoyTableConfig } from '../table/moy-table';

export class MoyRow<Model> {
  columns: string[] = [];
  cellMap: { [col: string]: MoyCell<Model[keyof Model]> } = {};

  constructor(config: MoyTableConfig<Model> & { value: Model }) {
    this.columns = Object.keys(config.columns);
    this.columns.forEach(k => {
      const { class: Builder, controlOptions } = config.columns[k as keyof Model];
      const cell = new MoyCell({ class: Builder, value: config.value[k], controlOptions });
      this.cellMap[k] = cell;
    });
  }
}
