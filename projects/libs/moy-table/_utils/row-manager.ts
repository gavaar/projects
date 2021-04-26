import { MoyRow } from '../row/moy-row';
import { MoyTableConfig, MoyTableFilter } from '../table';
import { MoyInnerRow } from '../row/moy-inner-row';
import { AbstractMoyRow } from '../row/row.abstract';

export class MoyRowManager<Model> {
  get allRows(): AbstractMoyRow<Model>[] {
    return [...this._allRows.values()];
  }
  private _allRows = new Map<string, AbstractMoyRow<Model>>();

  get allValues() {
    return this._allValues;
  }
  private _allValues = [];

  private _groupings: (keyof Model)[] = [];
  private _filters: MoyTableFilter<Model>['columns'] = {};
  private _frequency: MoyTableFilter<Model>['frequency'] = {};

  constructor(private _tableConfig: MoyTableConfig<Model>) {
    this._groupings = Object.keys(this._tableConfig.columns) as (keyof Model)[];
  }

  addRows(values: Model[]): AbstractMoyRow<Model>[] {
    this._allValues.push(...values);
    const filteredValues = this.filteredValues();
    filteredValues.forEach(row => {
      const rowId = this._groupings.map(c => row[c]).join('__');
      this.addValueToRowList(rowId, row);
    });
    const frequencyValues = this.filterByFrequency();
    return frequencyValues;
  }

  setRows(values: Model[]): AbstractMoyRow<Model>[] {
    this._allRows.clear();
    this._allValues = [];
    return this.addRows(values);
  }

  setGrouping(groupings: { [c in keyof Model]?: boolean }): AbstractMoyRow<Model>[] {
    const selectedGroupings = Object.keys(groupings).filter(g => groupings[g]);
    this._groupings = (selectedGroupings.length ? selectedGroupings : Object.keys(groupings)) as (keyof Model)[];
    return this.setRows(this._allValues);
  }

  setFilters(filters: MoyTableFilter<Model>): AbstractMoyRow<Model>[] {
    this._filters = filters.columns;
    this._frequency = filters.frequency;
    return this.setRows(this._allValues);
  }

  private filterByFrequency(rows = this.allRows): AbstractMoyRow<Model>[] {
    return rows.filter(r => {
      const { lowerThan, higherThan } = this._frequency;

      if (!lowerThan && !higherThan) {
        return true;
      } else {
        const length = r instanceof MoyInnerRow ? r.innerValues.length : 1;
        return (!lowerThan || length <= lowerThan) && (!higherThan || length >= higherThan);
      }
    });
  }

  private filteredValues(columns = this._filters): Model[] {
    return this._allValues.filter(val => {
      return Object.keys(columns).find(col => {
        return !columns[col](val[col]);
      }) == null;
    });
  }

  private addValueToRowList(rowId: string, value: Model): void {
    if (!this._allRows.has(rowId)) {
      const newRow = new MoyRow<Model>({ ...this._tableConfig, value });
      this._allRows.set(rowId, newRow);
    } else {
      const prevRow = this._allRows.get(rowId) as MoyRow<Model> | MoyInnerRow<Model>;

      if (prevRow instanceof MoyInnerRow) {
        prevRow.innerValues.push(value);
      } else {
        const prevValue = prevRow.value;
        const onlyGroupingsValue = this._groupings.reduce((groupingObj, column) => {
          groupingObj[column] = value[column]
          return groupingObj; 
        }, {} as Model)
        const newRow = new MoyInnerRow<Model>({ ...this._tableConfig, value: onlyGroupingsValue, innerValues: [prevValue, value] });
        this._allRows.set(rowId, newRow);
      }
    }
  }
}
