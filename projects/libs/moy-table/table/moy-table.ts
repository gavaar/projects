import { MoyInput } from '@libs/moy-input';
import { MoyColumnConfig } from '../column/column';
import { MoyColumnManager } from '../column/column-manager';
import { PageEvent } from '@angular/material/paginator';
import { MoyTableConfig, MoyTableFilter } from './interfaces';
import { MoyRowManager } from '../_utils/row-manager';
import { PageManager } from '../_utils/page-manager';

const pageSize = 30;
function buildTableConfig(headerRow: string[], editableRows = false): MoyTableConfig<any> {
  const columnDefault: MoyColumnConfig = { class: MoyInput, controlOptions: { disabled: true } };
  columnDefault.controlOptions.disabled = !editableRows;
  return headerRow.reduce((config, column) => {
    config.columns[column] = columnDefault;
    return config;
  }, { columns: {}, settings: {} } as MoyTableConfig<any>);
}

export class MoyTable<Model> {
  static basicConfig = buildTableConfig;

  columns: MoyColumnManager;
  pageManager = new PageManager([], { pageSize });

  readonly pageSize = pageSize;

  private _rowManager: MoyRowManager<Model>;
  private _grouping: { [c in keyof Model]?: boolean } = {};

  constructor(public config: MoyTableConfig<Model>) {
    const { settings } = config;
    const columnNames = Object.keys(config.columns);
    this.columns = new MoyColumnManager(columnNames, settings);
    this._rowManager = new MoyRowManager(config);
    this.columns.headers.forEach(c => this._grouping[c] = false);
  }

  addRows(rows: Model[]) {
    const allRows = this._rowManager.addRows(rows);
    this.pageManager.reset(allRows);
  }

  setFilters({ columns, frequency }: MoyTableFilter<Model>) {
    const filteredRows = this._rowManager.setFilters({ columns, frequency });
    this.pageManager.reset(filteredRows);
  }

  setPage({ pageIndex }: PageEvent) {
    const modif = pageIndex - this.pageManager.currentPage;
    this.pageManager.setPage(modif);
  }

  setGrouping(column: keyof Model, value: boolean) {
    if (this._grouping[column] === value) return;
    this._grouping[column] = value;
    const filteredRows = this._rowManager.setGrouping(this._grouping);
    this.pageManager.reset(filteredRows);
  }
}
