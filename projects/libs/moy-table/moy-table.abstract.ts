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

  private destroy$ = new Subject();
  private _loadingRows: AbstractRow<T>[];
  private _columnConfig: { [column: string]: Column } = {};
  private _mergeStrategy: { pivot: string; config: MergeStrategyConfig<T> };
  private _rowLimit: number;
  private _rowDataList: T[] = [];
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
      this._mergeStrategy = {
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
    this._rowDataList.unshift(...rows);
    this._matrix.next(this.getMatrix());
  }

  removeRows(rows: T[]): void {
    this._rowDataList = this._rowDataList.filter(r => rows.find(rowToDel => rowToDel.id === r.id) == null);
    this._matrix.next(this.getMatrix());
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

  private getMatrix() {
    return this.transformToMoyInputList(this._rowDataList);
  }

  private transformToMoyInputList(rows: T[]): AbstractRow<T>[] {
    if (this._mergeStrategy) {
      const { pivot, config: _mergeConfig } = this._mergeStrategy;
      const rowsByPivot = rows.reduce((_byPivot, row: T) => {
        const _currentPivotValue = row[pivot];
        if (!_byPivot[_currentPivotValue]) _byPivot[_currentPivotValue] = [];
        _byPivot[_currentPivotValue].push(this.transformToMoyInput(row));
        return _byPivot;
      }, <{ [column: string]: AbstractRow<T>[] }>{});

      const parentRows: AbstractRow<T>[] = Object.values(rowsByPivot).map((rows: AbstractRow<T>[]) => {
        if (rows.length <= 1) return rows[0];
        return new ExpandableRow({ innerRows: rows, mergeStrategy: _mergeConfig, config: this._columnConfig });
      });

      console.log({ parentRows });
      return parentRows;
    }

    return rows.map(this.transformToMoyInput);
  }

  private transformToMoyInput = (row: T): AbstractRow<T> => {
    const newRow = new Row({ row, config: this._columnConfig });
    newRow.rowChanges.pipe(takeUntil(this.destroy$)).subscribe(change => {
      this._rowChanges.next(<RowChanges<T>>change);
    });
    return newRow;
  };
}

export { Column, RowChanges, MoyTableConfig, MergeStrategy, AbstractMoyTable };
