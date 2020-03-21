import { AbstractMoyButton, MoyButtonConfig, MoyButtonRound } from '@libs/moy-button/moy-button.models';
import { AbstractMoyInput, InputInterface, MoyInput, MoyInputNumber } from '@libs/moy-input/moy-input.models';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { debounceTime, map, pairwise, startWith, takeUntil } from 'rxjs/operators';

// prettier-ignore
type Column = {
  type: typeof MoyInput;
  config?: InputInterface<string>;
} | {
  type: typeof MoyInputNumber;
  config?: InputInterface<number>;
}  | {
  type: typeof MoyButtonRound;
  config?: MoyButtonConfig;
};
// prettier-ignore
type Cell<T> = {
  [column: string]: AbstractMoyInput<T[keyof T]>
    | (AbstractMoyButton & {
      __rowContext__?: { [key: string]: any };
    });
};

interface MoyTableConfig<T> {
  columns: { [column: string]: Column };
  customColumnText?: { [column: string]: string };
  editableRows?: boolean;
  maxRows?: number;
}

export class AbstractMoyTable<T extends { [key: string]: any }> {
  columns: string[];
  customColumnText?: { [column: string]: string };

  private destroy$ = new Subject();
  private _loadingRows: Cell<T>[];
  private _config: { [column: string]: Column } = {};
  private _matrix = new BehaviorSubject<Cell<T>[]>([]);
  private _rowChanges = new Subject<T>();
  private _rowLimit: number;
  private _rowDataList: T[] = [];

  get matrix(): Cell<T>[] {
    const matrix = this._matrix.getValue();
    if (this._rowLimit && matrix.length > this._rowLimit) matrix.length = this._rowLimit;
    return matrix;
  }
  get matrix$(): Observable<Cell<T>[]> {
    return this._matrix.asObservable().pipe(map(m => (this._rowLimit ? m.slice(0, this._rowLimit) : m)));
  }

  constructor(config: MoyTableConfig<Partial<T>>) {
    this.columns = Object.keys(config.columns);
    this._config = config.columns;
    this.customColumnText = config.customColumnText || {};
    this._rowLimit = config.maxRows;
  }

  setLoading() {
    if (!this._loadingRows) {
      this._loadingRows = Array.from(new Array(5), _ => ({ ...this.buildLoading() }));
    }
    this._matrix.next(this._loadingRows);
  }

  destroyTable() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  addRows(rows: T[]): void {
    this._rowDataList.unshift(...rows);
    this._matrix.next(this._rowDataList.map(this.transformRowToMoyInput));
  }

  removeRows(rows: T[]): void {
    this._rowDataList = this._rowDataList.filter(r => rows.find(rowToDel => rowToDel.id === r.id) == null);
    this._matrix.next(this._rowDataList.map(this.transformRowToMoyInput));
  }

  rowChanges(): Observable<T> {
    return this._rowChanges.asObservable();
  }

  private buildLoading(): Cell<T> {
    const _loadingRow = this.columns.reduce((rowT, column) => {
      rowT[column] = <any>{ type: 'table_loading' };
      return rowT;
    }, <Cell<T>>{});
    return _loadingRow;
  }

  private transformRowToMoyInput = (row: T): Cell<T> => {
    return this.columns.reduce((input, column) => {
      const _config = this._config[column].config || {};
      const _class = this._config[column].type;
      _config['value'] = row[column];
      input[column] = new _class(<any>_config);
      const _input = input[column] as AbstractMoyInput<any>;
      _input['__rowContext__'] = { ...row };

      if (_input.control) {
        _input.control.valueChanges
          .pipe(takeUntil(this.destroy$), debounceTime(500), startWith(_input.control.value), pairwise())
          .subscribe(([prev, next]) => {
            row[column as keyof T] = next;
            this._rowChanges.next({ ...row, __changedProp__: column, __prev__: prev });
          });
      }
      return input;
    }, {} as Cell<T>);
  };
}

export class MoyTable<T> extends AbstractMoyTable<T> {}
