import { MoyColumnConfig } from '../column/column';
import { MoyRow } from '../row/moy-row';


// Table
export interface MoyTableConfig<Model> {
  columns: {
    [column in keyof Model]: MoyColumnConfig;
  }
}

export class MoyTable<Model> {
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