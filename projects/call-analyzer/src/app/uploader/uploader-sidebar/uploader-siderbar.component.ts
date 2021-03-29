import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MoyInput, MoyInputNumber } from '@libs/moy-input';
import { checkStringType, FilterType } from '../uploader.utils';
import { LocalStorageManager } from '../../helpers/local-storage';

const LS_TYPE_VALUES_TOKEN = 'type_values';
interface SidebarOptions {
  columns: { [column: string]: MoyInput };
  types: { [column_type: string]: FormControl };
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

  columnMap: SidebarOptions['columns'];
  typeMap: SidebarOptions['types'];

  private lsManager = new LocalStorageManager(LS_TYPE_VALUES_TOKEN);

  ngOnInit(): void {
    const { columns, types } = this.buildFilters();
    this.columnMap = columns;
    this.typeMap = types;
  }

  onTypeChange(column: string): void {
    const columnType = `${column}::type`;
    const { value } = this.typeMap[columnType];
    this.lsManager.patch({ [columnType]: value });

    const InputClass = this.inputType(value);
    this.columnMap[column] = new InputClass({ label: column, placeholder: 'search?' });
  }

  private buildFilters(): SidebarOptions {
    const { exampleRow, columns } = this.tableFilters;
    const typeValues = this.lsManager.get();
    const sideBarOptions =  columns.reduce((fg, column, index) => {
      const typeColumn = `${column}::type`;
      const typeValue = typeValues[typeColumn] || checkStringType(exampleRow[index]);
      const InputClass = this.inputType(typeValue);

      fg.columns[column] = new InputClass({ label: column, placeholder: 'search?' });
      typeValues[typeColumn] = typeValue;
      fg.types[typeColumn] = new FormControl(typeValue);
      return fg;
    }, { columns: {}, types: {} } as SidebarOptions)

    this.lsManager.patch(typeValues);
    return sideBarOptions;
  }

  private inputType(type: FilterType) {
    switch (type) {
      case FilterType.String:
        return MoyInput;
      case FilterType.Number:
        return MoyInputNumber;
      case FilterType.Date:
        return MoyInput;
    }
  }
}
