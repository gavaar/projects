import { AbstractMoyButton, MoyButton, MoyButtonConfig } from '@libs/moy-button/moy-button.models';
import { AbstractMoyInput, InputInterface, MoyInput, MoyInputNumber } from '@libs/moy-input/moy-input.models';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

type InputColumn = { type: typeof MoyInput | typeof MoyInputNumber; config?: InputInterface<any> };
type ButtonColumn = { type: typeof MoyButton; config?: MoyButtonConfig };
type Column = InputColumn | ButtonColumn;
type RowChanges<T> = Partial<T> & { id: string; __prevState__: T };
enum RowType {
  Default = 'row_default',
  Expandable = 'row_expandable',
}

interface RowOptions<T> {
  row: T;
  config: { [column: string]: Column };
}

class AbstractRow<T> {
  cellMap: { [column: string]: (AbstractMoyInput<T[keyof T]> | AbstractMoyButton) & { __originalRow__?: T } };

  private _rowData: T;
  private _rowChanges = new Subject<RowChanges<T>>();

  get rowData(): T {
    return this._rowData;
  }
  get rowChanges(): Observable<RowChanges<T>> {
    return this._rowChanges.asObservable();
  }

  readonly type: RowType;

  constructor({ row: rowValues, config }: RowOptions<T>) {
    this._rowData = rowValues;
    this.cellMap = Object.keys(config).reduce((_cellMap, cellColumn) => {
      const _class = config[cellColumn].type;
      const _cellConfig = config[cellColumn].config;

      _cellMap[cellColumn] = new _class(<any>_cellConfig);
      _cellMap[cellColumn].__originalRow__ = { ...this._rowData };

      const _control = (<AbstractMoyInput<T>>_cellMap[cellColumn]).control;

      if (_control) {
        _control.setValue(rowValues[cellColumn]);
        _control.valueChanges.pipe(debounceTime(500), distinctUntilChanged()).subscribe((newValue: T[keyof T]) => {
          const id: string = this._rowData['id'];
          const __prevState__ = { ...this._rowData };
          this._rowData[cellColumn] = newValue;
          this._rowChanges.next(<RowChanges<T>>{ id, __prevState__, [cellColumn]: newValue });
        });
      }

      return _cellMap;
    }, {} as AbstractRow<T>['cellMap']);
  }

  click() {}
}

export { AbstractRow, Column, RowType, RowChanges, RowOptions };
