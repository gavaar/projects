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

      if (!this._rowMap.get(_pivot)) {
        this._rowMap.set(_pivot, _newRow);
      } else if (!(<ExpandableRow<T>>this._rowMap.get(_pivot)).innerRows) {
        const _previousRow = this._rowMap.get(_pivot);
        this._rowMap.delete(_pivot);
        this._rowMap.set(
          _pivot,
          new ExpandableRow({
            mergeStrategy: this.mergeStrategy.config,
            config: this._columnConfig,
            innerRows: [_newRow, _previousRow],
          }),
        );
      } else {
        const _expandable = this._rowMap.get(_pivot) as ExpandableRow<T>;
        const _innerRows = [_newRow, ..._expandable.innerRows];
        const _newExpandable = new ExpandableRow<T>({
          config: this._columnConfig,
          mergeStrategy: this.mergeStrategy.config,
          innerRows: _innerRows,
        });
        _newExpandable.expanded = _expandable.expanded;
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
          this._rowMap.set(_pivot, new Row({ row: _expandable.innerRows[0].rowData, config: this._columnConfig }));
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
      this._rowChanges.next(<RowChanges<T>>change);
    });
    return newRow;
  };
}

export { Column, RowChanges, MoyTableConfig, MergeStrategy, AbstractMoyTable };
