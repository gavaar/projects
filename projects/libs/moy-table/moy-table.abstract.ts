import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { AbstractRow, Column, RowChanges } from './row/row.abstract';
import { ExpandableRow, MergeStrategy, Row } from './row/row.models';

type MergeStrategyConfig<T> = { [column in keyof MoyTableConfig<T>['columns']]: MergeStrategy };

interface MoyTableConfig<T> {
  columns: { [column: string]: Column };
  customColumnText?: { [column: string]: string };
  editableRows?: boolean;
  maxRows?: number;
  mergeStrategy?: MergeStrategyConfig<T>;
}

class AbstractMoyTable<T extends { [key: string]: any }> {
  columns: string[];
  customColumnText?: { [column: string]: string };
  mergeStrategy: { pivot: string; config: MergeStrategyConfig<T> };

  private destroy$ = new Subject();
  private _loadingRows: AbstractRow<T>[];
  private _columnConfig: { [column: string]: Column } = {};
  private _rowLimit: number;
  private _rowMap: Map<string, AbstractRow<T>> = new Map();
  private _matrix = new BehaviorSubject<AbstractRow<T>[]>([]);
  private _rowChanges = new Subject<RowChanges<T>>();

  get matrix$(): Observable<AbstractRow<T>[]> {
    return this._matrix.asObservable().pipe(map(m => (this._rowLimit ? m.slice(0, this._rowLimit) : m)));
  }

  constructor(config: MoyTableConfig<T>) {
    this.columns = Object.keys(config.columns);
    this._columnConfig = config.columns;
    this.customColumnText = config.customColumnText || {};
    this._rowLimit = config.maxRows;
    if (config.mergeStrategy) {
      this.mergeStrategy = {
        pivot: Object.keys(config.mergeStrategy).find(key => config.mergeStrategy[key] === MergeStrategy.Pivot),
        config: config.mergeStrategy,
      };
    }
  }

  setLoading() {
    if (!this._loadingRows) this._loadingRows = Array.from(new Array(5), _ => this.buildLoading());
    this._matrix.next(this._loadingRows);
  }

  destroyTable() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  addRows(rows: T[]): void {
    rows.map(_row => {
      const _pivot = this.mergeStrategy ? _row[this.mergeStrategy.pivot] : _row.id;
      const _newRow = this.transformToMoyInput(_row);
      const _existingRow = <ExpandableRow<T>>this._rowMap.get(_pivot);

      if (!_existingRow) {
        this._rowMap.set(_pivot, _newRow);
      } else if (!_existingRow.innerRows) {
        const _newExpandable = new ExpandableRow({
          mergeStrategy: this.mergeStrategy.config,
          config: this._columnConfig,
          innerRows: [_newRow, _existingRow],
        });
        this._rowMap.delete(_pivot);
        this._rowMap.set(_pivot, _newExpandable);
      } else {
        const _innerRows = [_newRow, ..._existingRow.innerRows];
        const _newExpandable = new ExpandableRow<T>({
          config: this._columnConfig,
          mergeStrategy: this.mergeStrategy.config,
          innerRows: _innerRows,
        });
        this._rowMap.delete(_pivot);
        this._rowMap.set(_pivot, _newExpandable);
      }
    });

    this._matrix.next([...this._rowMap.values()].reverse());
  }

  removeRows(rows: T[]): void {
    rows.map(_row => {
      const _pivot = this.mergeStrategy ? _row[this.mergeStrategy.pivot] : _row.id;

      if (!(<ExpandableRow<T>>this._rowMap.get(_pivot)).innerRows) {
        this._rowMap.delete(_pivot);
      } else {
        const _expandable = this._rowMap.get(_pivot) as ExpandableRow<T>;
        const _deletingRowIds = rows.map(r => r.id);
        _expandable.innerRows = _expandable.innerRows.filter(({ rowData }) => !_deletingRowIds.includes(rowData.id));

        if (_expandable.innerRows.length <= 1) {
          this._rowMap.set(_pivot, this.transformToMoyInput(_expandable.innerRows[0].rowData));
        } else {
          _expandable.refreshValues();
          this._rowMap.set(_pivot, _expandable);
        }
      }
    });

    this._matrix.next([...this._rowMap.values()].reverse());
  }

  rowChanges(): Observable<RowChanges<T>> {
    return this._rowChanges.asObservable();
  }

  private buildLoading(): AbstractRow<T> {
    return {
      cellMap: this.columns.reduce((rowT, column) => {
        rowT[column] = { type: 'table_loading' };
        return rowT;
      }, <Column>{}),
    } as any;
  }

  private transformToMoyInput = (row: T): AbstractRow<T> => {
    const newRow = new Row({ row, config: this._columnConfig });
    newRow.cellChanges.pipe(takeUntil(this.destroy$)).subscribe(change => {
      const _pivot = this.mergeStrategy.pivot;
      const _newPivotValue = change[_pivot];
      const _pivotPrevValue = change.__prevState__[_pivot];
      const _row = this._rowMap.get(_pivotPrevValue) as ExpandableRow<T>;

      // if pivot changed, should be moved to another pivot
      if (_newPivotValue) {
        const _rowToDelete = _row.innerRows
          ? { ..._row.innerRows.find(r => r.rowData.id === change.id).rowData }
          : { ..._row.rowData };
        this.addRows([_rowToDelete]);
        this.removeRows([{ ..._rowToDelete, [_pivot]: _pivotPrevValue }]);
      } else if (_row.innerRows) {
        _row.refreshValues();
      }
      this._rowChanges.next(<RowChanges<T>>change);
    });
    return newRow;
  };
}

export { Column, RowChanges, MoyTableConfig, MergeStrategy, AbstractMoyTable };
