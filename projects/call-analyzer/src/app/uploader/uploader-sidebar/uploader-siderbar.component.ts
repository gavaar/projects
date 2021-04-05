import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MoyInput, MoyInputNumber, MoySelect } from '@libs/moy-input';
import { checkStringType, FilterType } from '../uploader.utils';
import { LocalStorageManager } from '../../helpers/local-storage';
import { INPUT_APPENDS, LS_TYPE_VALUES_TOKEN, SELECT_OPTIONS } from './uploader-sidebar.config';

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
  FilterType = FilterType;
  INPUT_APPENDS = INPUT_APPENDS;

  columnMap: SidebarOptions['columns'];
  typeMap: SidebarOptions['types'];

  private _lsManager = new LocalStorageManager(LS_TYPE_VALUES_TOKEN);

  ngOnInit(): void {
    const { columns, types } = this.sidebarOptions();
    this.columnMap = columns;
    this.typeMap = types;
  }

  onFilterChange(column: string, value: string) {
    console.log({ column, value, that: this });
  }

  onTypeChange(column: string, value: FilterType): void {
    this._lsManager.patch({ [`${column}::${INPUT_APPENDS.typeAppend}`]: value });

    this.inputConfig(column, value).forEach(col => {
      this.columnMap[col.id] = col;
    });
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
          new MoyInput({ ...opts, id: `${column}::${INPUT_APPENDS.dateAfter}`, label: INPUT_APPENDS.dateAfter }),
          new MoyInput({ ...opts, id: `${column}::${INPUT_APPENDS.dateBefore}`, label: INPUT_APPENDS.dateBefore }),
        ];
    }
  }
}
