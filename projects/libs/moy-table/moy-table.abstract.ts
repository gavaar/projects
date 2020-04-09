import { AbstractMoyButton, MoyButtonConfig } from '@libs/moy-button/moy-button.models';
import { AbstractMoyInput, InputInterface, MoyInput, MoyInputNumber } from '@libs/moy-input/moy-input.models';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, take, takeUntil } from 'rxjs/operators';
import { AbstractRow } from './row/row.abstract';
import { Row } from './row/row.models';

type Column = {
  type: typeof MoyInput | typeof MoyInputNumber | typeof AbstractMoyButton;
  config?: Column['type'] extends typeof AbstractMoyInput ? InputInterface<any> : MoyButtonConfig;
};
type RowChanges<T> = Partial<T> & { id: string; __prevState__: T };

interface MoyTableConfig<T> {
  columns: { [column: string]: Column };
  customColumnText?: { [column: string]: string };
  editableRows?: boolean;
  maxRows?: number;
}

class AbstractMoyTable<T extends { [key: string]: any }> {
  columns: string[];
  customColumnText?: { [column: string]: string };

  private destroy$ = new Subject();
  private _loadingRows: AbstractRow<T>[];
  private _config: { [column: string]: Column } = {};
  private _matrix = new BehaviorSubject<AbstractRow<T>[]>([]);
  private _rowChanges = new Subject<RowChanges<T>>();
  private _rowLimit: number;
  private _rowDataList: T[] = [];

  get matrix$(): Observable<AbstractRow<T>[]> {
    return this._matrix.asObservable().pipe(map(m => (this._rowLimit ? m.slice(0, this._rowLimit) : m)));
  }

  constructor(config: MoyTableConfig<T>) {
    this.columns = Object.keys(config.columns);
    this._config = config.columns;
    this.customColumnText = config.customColumnText || {};
    this._rowLimit = config.maxRows;
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
    return this._rowDataList.map(this.transformToMoyInput);
  }

  private transformToMoyInput = (row: T): AbstractRow<T> => {
    const newRow = new Row({ row, config: this._config });
    newRow.rowChanges.pipe(takeUntil(this.destroy$)).subscribe(change => {
      this._rowChanges.next(<RowChanges<T>>change);
    });
    return newRow;
  };
}

export { Column, RowChanges, MoyTableConfig, AbstractMoyTable };
