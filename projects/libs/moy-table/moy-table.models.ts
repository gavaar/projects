import { AbstractMoyInput, InputType, MoyInput, MoyInputNumber } from '@libs/moy-input/moy-input.models';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

interface MoyTableConfig {
  columnsToShow: { [name: string]: InputType };
  editableRows?: boolean;
  maxRows?: number;
}

type Cell<T> = { [column: string]: AbstractMoyInput<T[keyof T]> };

export class AbstractMoyTable<T extends { [key: string]: any }> {
  columns: (keyof T)[];

  private destroy$ = new Subject();
  private _columnTypes: { [column: string]: InputType };
  private _matrix = new BehaviorSubject<Cell<T>[]>([]);
  private _rowChanges = new Subject<T>();
  private _editableRows: boolean;
  private _rowLimit: number;

  get matrix(): Cell<T>[] {
    const matrix = this._matrix.getValue();
    if (this._rowLimit) matrix.length = this._rowLimit;
    return matrix;
  }

  get matrix$(): Observable<Cell<T>[]> {
    return this._matrix.asObservable().pipe(map(m => (this._rowLimit ? m.slice(0, this._rowLimit) : m)));
  }

  get editableRows(): boolean {
    return this._editableRows;
  }

  constructor(config: MoyTableConfig) {
    this.columns = Object.keys(config.columnsToShow);
    this._columnTypes = config.columnsToShow;
    this._editableRows = config.editableRows;
    this._rowLimit = config.maxRows;
  }

  destroyTable() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  addRows(rows: T[]): void {
    this._matrix.next([...rows.map<Cell<T>>(row => this.transformRowToMoyInput<T>(row)), ...this._matrix.value]);
  }

  rowChanges(): Observable<T> {
    return this._rowChanges.asObservable();
  }

  private transformRowToMoyInput<T>(row: T): Cell<T> {
    return Object.keys(row).reduce((input, k) => {
      const inputConfig = { value: row[k], controlOptions: { disabled: !this.editableRows } };
      switch (this._columnTypes[k]) {
        case InputType.Number:
          input[k] = new MoyInputNumber(inputConfig);
          break;
        default:
          input[k] = new MoyInput(inputConfig);
          break;
      }

      input[k].control.valueChanges
        .pipe(takeUntil(this.destroy$))
        .subscribe(_ => this._rowChanges.next(<any>{ ...row, [k]: _ }));
      return input;
    }, {} as Cell<T>);
  }
}

export class MoyTable<T> extends AbstractMoyTable<T> {}
