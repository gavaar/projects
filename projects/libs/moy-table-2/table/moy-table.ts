import { MoyInput } from '@libs/moy-input';
import { MoyColumnConfig } from '../column/column';
import { MoyRow } from '../row/moy-row';
import { BehaviorSubject, Observable } from 'rxjs';

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

export interface MoyTableFilter<Model> {
  columns: {
    [column in keyof Model]: (value: Model[column]) => boolean;
  }
}

export class MoyTable<Model> {
  static basicConfig = buildTableConfig;

  columns: string[] = [];
  totalRows = 0;

  row$: Observable<MoyRow<Model>[]>;

  private _rows = new BehaviorSubject<MoyRow<Model>[]>([]);
  private _allRows: MoyRow<Model>[] = [];

  constructor(private config: MoyTableConfig<Model>) {
    this.columns = Object.keys(config.columns);
    this.row$ = this._rows.asObservable();
  }

  addRows(rows: Model[]) {
    this._allRows = [...this._rows.value, ...this.buildRows(rows)];
    this.setBody();
  }

  setFilters({ columns }: MoyTableFilter<Model>) {
    const filteredRows = this._allRows.filter(row => {
      return row.columns.find(col => {
        const { value } = row.cellMap[col].content.control;
        const valueShouldGo = columns[col] && !columns[col](value);
        return valueShouldGo;
      }) == null;
    });

    this.setBody(filteredRows);
  }

  private setBody(rows = this._allRows) {
    this.totalRows = rows.length;
    this._rows.next(rows.slice(0, 500));
  }

  private buildRows(rows: Model[]): MoyRow<Model>[] {
    return rows.map(row => {
      const rowConfig = { ...this.config, value: row };
      return new MoyRow(rowConfig);
    });
  }
}