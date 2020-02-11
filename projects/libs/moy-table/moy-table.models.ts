import { AbstractMoyInput, InputType, MoyInput, MoyInputNumber } from '@libs/moy-input/moy-input.models';
import { BehaviorSubject, Observable } from 'rxjs';

interface MoyTableConfig {
  columnsToShow: { [name: string]: InputType };
  editableRows?: boolean;
}

type Cell<T> = { [column: string]: AbstractMoyInput<T[keyof T]> };

export class AbstractMoyTable<T extends { [key: string]: any }> {
  columns: (keyof T)[];

  private _columnTypes: { [column: string]: InputType };
  private _matrix = new BehaviorSubject<Cell<T>[]>([]);
  private _editableRows: boolean;

  get matrix(): Cell<T>[] {
    return this._matrix.getValue();
  }

  get matrix$(): Observable<Cell<T>[]> {
    return this._matrix.asObservable();
  }

  get editableRows(): boolean {
    return this._editableRows;
  }

  constructor(config: MoyTableConfig) {
    this.columns = Object.keys(config.columnsToShow);
    this._columnTypes = config.columnsToShow;
    this._editableRows = config.editableRows;
  }

  addRows(rows: T[]): void {
    this._matrix.next([...rows.map<Cell<T>>(row => this.transformRowToMoyInput<T>(row)), ...this._matrix.value]);
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

      return input;
    }, {});
  }
}

export class MoyTable<T> extends AbstractMoyTable<T> {}
