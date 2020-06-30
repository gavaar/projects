import { AbstractMoyInput } from '@libs/moy-input/moy-input.models';
import { BehaviorSubject, Observable } from 'rxjs';
import { AbstractRow, Column, RowType } from './row.abstract';

/* ROW */
class Row<T> extends AbstractRow<T> {
  type = RowType.Default;
}

/* EXPANDABLE ROW */
enum MergeStrategy {
  Pivot = 'table_merge_pivot',
  Sum = 'table_merge_sum',
  First = 'table_merge_first',
  Last = 'table_merge_last',
}
interface ExpandableRowOptions<T> {
  innerRows: AbstractRow<T>[];
  config: { [column: string]: Column };
  mergeStrategy: { [column: string]: MergeStrategy };
}

const getRowFromRowList = <T>(rows: T[], strategy: ExpandableRowOptions<T>['mergeStrategy']): T => {
  const mergedRow = <T>{};
  rows.map(_innerRow =>
    Object.keys(_innerRow).map(key => {
      switch (strategy[key]) {
        case MergeStrategy.Pivot:
        case MergeStrategy.Last:
          if (!mergedRow[key]) mergedRow[key] = _innerRow[key];
          break;
        case MergeStrategy.First:
          mergedRow[key] = _innerRow[key];
          break;
        case MergeStrategy.Sum:
          if (!mergedRow[key]) mergedRow[key] = 0;
          mergedRow[key] += +_innerRow[key];
          mergedRow[key] = +mergedRow[key].toFixed(2);
          break;
      }
    }),
  );

  return mergedRow;
};

const disableControlsFromConfig = <T>(cellMap: { [column: string]: AbstractMoyInput<T> }): void => {
  Object.values(cellMap).forEach(moyInput => moyInput.control && moyInput.control.disable());
};

class ExpandableRow<T> extends AbstractRow<T> {
  type = RowType.Expandable;
  expanded = false;

  get innerRows(): Row<T>[] {
    return this._innerRows.getValue();
  }
  set innerRows(rows: Row<T>[]) {
    this._innerRows.next(rows);
  }
  get innerRows$(): Observable<Row<T>[]> {
    return this._innerRows.asObservable();
  }

  private _innerRows = new BehaviorSubject<Row<T>[]>([]);
  private _mergeStrat: ExpandableRowOptions<T>['mergeStrategy'];

  constructor(opts: ExpandableRowOptions<T>) {
    super({
      row: getRowFromRowList(
        opts.innerRows.map(r => r.rowData),
        opts.mergeStrategy,
      ),
      config: opts.config,
    });
    this._innerRows.next(opts.innerRows);
    this._mergeStrat = opts.mergeStrategy;
    disableControlsFromConfig(this.cellMap as { [column: string]: AbstractMoyInput<T> });
  }

  addRow(row: Row<T>) {
    this._innerRows.next([row, ...this.innerRows]);
    this.refreshValues();
  }

  refreshValues(): void {
    this._rowData = getRowFromRowList(
      this.innerRows.map(r => r.rowData),
      this._mergeStrat,
    );
    this.cellMap = this.buildCellMap();
    disableControlsFromConfig(this.cellMap as { [column: string]: AbstractMoyInput<T> });
  }

  click() {
    this.expanded = !this.expanded;
  }
}

export { Row, MergeStrategy, ExpandableRow };
