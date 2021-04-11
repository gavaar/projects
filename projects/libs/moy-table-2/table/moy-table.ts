import { MoyInput } from '@libs/moy-input';
import { MoyColumnConfig } from '../column/column';
import { MoyRow } from '../row/moy-row';
import { BehaviorSubject, Observable } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

const columnDefault: MoyColumnConfig = { class: MoyInput, controlOptions: { disabled: true } };
const pageSize = 50;

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

  private _pageIndex = 0;
  private _rows = new BehaviorSubject<MoyRow<Model>[]>([]);
  private _allRows: MoyRow<Model>[] = [];
  private _filteredRows: MoyRow<Model>[] = [];

  constructor(private config: MoyTableConfig<Model>) {
    this.columns = Object.keys(config.columns);
    this.row$ = this._rows.asObservable();
  }

  addRows(rows: Model[]) {
    this.clearFilters();
    this._allRows = [...this._rows.value, ...this.buildRows(rows)];
    this.setBody();
  }

  setFilters({ columns }: MoyTableFilter<Model>) {
    this._filteredRows = this._allRows.filter(row => {
      return row.columns.find(col => {
        const { value } = row.cellMap[col].content.control;
        const valueShouldGo = columns[col] && !columns[col](value);
        return valueShouldGo;
      }) == null;
    });

    this.setBody(this._filteredRows);
  }

  setPage({ pageIndex }: PageEvent) {
    this._pageIndex = pageIndex;
    this.setBody(this._filteredRows);
  }

  private clearFilters() {
    this._pageIndex = 0;
    this._filteredRows = [];
  }

  private setBody(rows = this._allRows, page = this._pageIndex) {
    this.totalRows = rows.length;
    this._rows.next(rows.slice(page * pageSize, (page + 1) * pageSize));
  }

  private buildRows(rows: Model[]): MoyRow<Model>[] {
    return rows.map(row => {
      const rowConfig = { ...this.config, value: row };
      return new MoyRow(rowConfig);
    });
  }
}