import { MoyInput } from '@libs/moy-input/moy-input.models';
import { BehaviorSubject, Observable } from 'rxjs';

interface MoyTableConfig {
  columnsToShow: string[];
  editableRows?: boolean;
}

type Cell<T> = { [column: string]: MoyInput };

function transformRowToMoyInput<T>(row: T): Cell<T> {
  return Object.keys(row).reduce((input, k) => {
    input[k] = new MoyInput({ value: row[k] });
    return input;
  }, {});
}

export class AbstractMoyTable<T extends { [key: string]: any }> {
  columns: (keyof T)[];

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
    this.columns = config.columnsToShow;
    this._editableRows = config.editableRows;
  }

  addRows(rows: T[]): void {
    this._matrix.next([...this._matrix.value, ...rows.map<Cell<T>>(row => transformRowToMoyInput<T>(row))]);
  }
}

export class MoyTable<T> extends AbstractMoyTable<T> {}
