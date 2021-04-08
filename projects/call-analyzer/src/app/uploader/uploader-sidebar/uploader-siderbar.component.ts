import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MoyDatepicker, MoyInput, MoyInputNumber, MoySelect } from '@libs/moy-input';
import { checkStringType, FilterType } from '../uploader.utils';
import { LocalStorageManager } from '../../helpers/local-storage';
import { INPUT_APPENDS, LS_TYPE_VALUES_TOKEN, SELECT_OPTIONS } from './uploader-sidebar.config';
import { MoyTableFilter } from '@libs/moy-table-2/table/moy-table';

interface SidebarOptions {
  columns: { [column: string]: MoyInput };
  types: { [column_type: string]: MoySelect };
}

@Component({
  selector: 'uploader-sidebar',
  templateUrl: './uploader-sidebar.component.html',
  styleUrls: ['./uploader-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploaderSidebarComponent implements OnInit {
  @Input() tableFilters: { columns: string[]; exampleRow: string[] };
  @Output() filtersUpdated = new EventEmitter<MoyTableFilter<any>>();

  FilterType = FilterType;
  INPUT_APPENDS = INPUT_APPENDS;

  columnMap: SidebarOptions['columns'];
  typeMap: SidebarOptions['types'];

  private _lsManager = new LocalStorageManager(LS_TYPE_VALUES_TOKEN);
  private _filtersForTable: MoyTableFilter<any>['columns'] = {};

  ngOnInit(): void {
    const { columns, types } = this.sidebarOptions();
    this.columnMap = columns;
    this.typeMap = types;
  }

  onFilterChange(column: string, value: string) {
    const noFilterCol = column.split('::')[0];
    this._filtersForTable[noFilterCol] = this.buildFilterFromColumn(noFilterCol, value);
    this.filtersUpdated.emit({ columns: this._filtersForTable });
  }

  onTypeChange(column: string, value: FilterType): void {
    this._lsManager.patch({ [`${column}::${INPUT_APPENDS.typeAppend}`]: value });

    this.inputConfig(column, value).forEach(col => {
      this.columnMap[col.id] = col;
    });
  }

  submitFilters = () => { // for testing, delete later
    const filters = Object.keys(this.columnMap).reduce((values, col) => {
      const typeValues = this._lsManager.get();
      const colValue = this.columnMap[col].control.value;
      const type = typeValues[col];
      const noFilterCol = col.split('::')[0];

      switch (type) {
        case FilterType.Number:
          break;
        case FilterType.Date:
          values[noFilterCol] = (val: string) => {
            const valueDate = new Date(val);
            return valueDate >= colValue.before && valueDate <= colValue.after;
          }
          break;
        default:
          values[noFilterCol] = (val: string) => {
            return val.includes(colValue);
          }
          break;
      }

      return values;
    }, {} as { [key: string]: any });
    console.log({ filters });
  }

  private sidebarOptions(): SidebarOptions {
    const { exampleRow, columns } = this.tableFilters;
    const typeValues = this._lsManager.get();
    const selectOptions = SELECT_OPTIONS;
    const sideBarOptions =  columns.reduce((fg, column, index) => {
      const typeColumn = `${column}::${INPUT_APPENDS.typeAppend}`;
      const typeValue = typeValues[typeColumn] || checkStringType(exampleRow[index] || '-');
      typeValues[typeColumn] = typeValue;
      const inputs = this.inputConfig(column, typeValue);
      inputs.forEach(col => {
        fg.columns[col.id] = col;
      });
      fg.types[typeColumn] = new MoySelect({ label: column, selectOptions, value: typeValue });
      return fg;
    }, { columns: {}, types: {} } as SidebarOptions)

    this._lsManager.patch(typeValues);
    return sideBarOptions;
  }

  private inputConfig(column: string, type: FilterType) {
    const opts = { label: 'Buscar', id: column, placeholder: `buscar en ${column}` };

    switch (type) {
      case FilterType.String:
        return [new MoyInput(opts)];
      case FilterType.Number:
        return [
          new MoyInputNumber({ ...opts, id: `${column}::${INPUT_APPENDS.numberAfter}`, label: INPUT_APPENDS.numberAfter }),
          new MoyInputNumber({ ...opts, id: `${column}::${INPUT_APPENDS.numberBefore}`, label: INPUT_APPENDS.numberBefore }),
        ];
      case FilterType.Date:
        return [
          new MoyDatepicker({
            ...opts, id: `${column}::${INPUT_APPENDS.date}`,
            label: INPUT_APPENDS.date,
            placeholder: 'seleccione fecha',
          }),
        ];
    }
  }

  private buildFilterFromColumn(column: string, value: any): (val: any) => boolean | null {
    const typeValues = this._lsManager.get();
    const type = typeValues[`${column}::${INPUT_APPENDS.typeAppend}`];

    switch (type) {
      case FilterType.Number:
        const numberBeforeColumn = `${column}::${INPUT_APPENDS.numberBefore}`;
        const numberAfterColumn = `${column}::${INPUT_APPENDS.numberAfter}`;

        const numberBeforeVal = +this.columnMap[numberBeforeColumn].control.value;
        const numberAfterVal = +this.columnMap[numberAfterColumn].control.value;
        if (!numberAfterVal && !numberBeforeVal) {
          return;
        }

        return (val: string) => {
          return (!numberBeforeVal || +val <= numberBeforeVal) && 
            (!numberAfterVal || +val >= numberAfterVal)
        };
      case FilterType.Date:
        const before = new Date(value.before);
        const after = new Date(value.after);

        return (val: string) => {
          const valueDate = new Date(val);
          return valueDate >= before && valueDate <= after;
        }
      default:
        return (val: string) => val.includes(value);
    }
  }
}
