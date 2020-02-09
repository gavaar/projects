import { BehaviorSubject, Observable } from 'rxjs';

type MoyMatrix<T> = { [column: string]: T[keyof T] }[];

interface MoyTableConfig {
  columnsToShow: string[];
  editableRows?: boolean;
}

export class AbstractMoyTable<T extends { [key: string]: any }> {
  columns: (keyof T)[];

  private _matrix = new BehaviorSubject<MoyMatrix<T>>([]);
  private _editableRows: boolean;

  get matrix(): MoyMatrix<T> {
    return this._matrix.getValue();
  }

  get matrix$(): Observable<MoyMatrix<T>> {
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
    this._matrix.next([...this.matrix, ...rows]);
  }
}

export class MoyTable<T> extends AbstractMoyTable<T> {}
