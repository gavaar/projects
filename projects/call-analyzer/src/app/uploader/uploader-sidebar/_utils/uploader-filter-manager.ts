import { MoyInput, MoySelect } from '@libs/moy-input';
import { LocalStorageManager } from '@helpers';
import { checkStringType, FilterType } from 'app/uploader/uploader.utils';
import { INPUT_APPENDS, LS_TYPE_VALUES_TOKEN, SELECT_OPTIONS } from '../uploader-sidebar.config';
import { MoyTableFilter } from '@libs/moy-table';
import { UploaderColumnTypeManager  } from './_models';
import { MoyButtonToggle } from '@libs/moy-button';

export class UploaderFilterManager {
  columns: { [column: string]: MoyInput } = {};
  types: { [column_type: string]: MoySelect } = {};
  groupings: { [column: string]: MoyButtonToggle } = {};
  
  private _lsManager = new LocalStorageManager(LS_TYPE_VALUES_TOKEN);
  private _typeManager = new UploaderColumnTypeManager();

  constructor({ exampleRow, columns }: { columns: string[]; exampleRow: string[] }) {
    const savedTypeValues = this._lsManager.get() || {};

    columns.forEach((column, index ) => {
      const typeColumn = `${column}::${INPUT_APPENDS.typeAppend}`;
      const type = savedTypeValues[typeColumn] || checkStringType(exampleRow[index] || '-');
      if (!savedTypeValues[typeColumn]) {
        savedTypeValues[typeColumn] = type;
      }

      this.updateColumnType(column, type);
      this.groupings[column] = new MoyButtonToggle({ text: column });
      this.types[typeColumn] = new MoySelect({ label: column, selectOptions: SELECT_OPTIONS, value: type });
    });

    // add extra filter type number to check for table frequency
    this.updateColumnType('__frequency__', FilterType.Number);

    if (!this._lsManager.exists()) {
      this._lsManager.patch(savedTypeValues);
    }
  }

  patchType(column: string, type: FilterType): void {
    this.updateColumnType(column, type);
    this._lsManager.patch({ [`${column}::${INPUT_APPENDS.typeAppend}`]: type });
  }

  buildFilter(column: string): MoyTableFilter<any>['columns'][any] {
    return this._typeManager.inputs[column].filtersForMoyTable();
  }

  private updateColumnType(column: string, type: FilterType): void {
    const handler = this._typeManager.updateColumnType(column, type);
    handler.inputs.forEach(input => this.columns[input.id] = input);
  }
}
