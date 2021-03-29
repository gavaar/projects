import { MoyInput } from '@libs/moy-input';
import { MoyColumnConfig } from '../column/column';
import { MoyRow } from '../row/moy-row';

const columnDefault: MoyColumnConfig = { class: MoyInput, controlOptions: { disabled: true } };

function buildTableConfig(headerRow: string[], editableRows = false): MoyTableConfig<any> {
  columnDefault.controlOptions.disabled = !editableRows;
  return headerRow.reduce((config, column) => {
    config.columns[column] = columnDefault;
    return config;
  }, { columns: {} } as MoyTableConfig<any>);
}

// Table
export interface MoyTableConfig<Model> {
  columns: {
    [column in keyof Model]: MoyColumnConfig;
  }
}

export class MoyTable<Model> {
  static basicConfig = buildTableConfig;

  columns: string[] = [];
  rows: MoyRow<Model>[] = [];
  totalRows = 0;

  private _allRows: MoyRow<Model>[] = [];

  constructor(private config: MoyTableConfig<Model>) {
    this.columns = Object.keys(config.columns);
  }

  addRows(rows: Model[]) {
    this._allRows = [...this.rows, ...this.buildRows(rows)];
    this.totalRows = this._allRows.length;
    this.rows = this._allRows.slice(0, 100);
  }

  private buildRows(rows: Model[]): MoyRow<Model>[] {
    return rows.map(row => {
      const rowConfig = { ...this.config, value: row };
      return new MoyRow(rowConfig);
    });
  }
}