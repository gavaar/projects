import { AbstractMoyInput, MoyDatepicker, MoyInput, MoyInputNumber } from '@libs/moy-input';
import { MoyTableFilter } from '@libs/moy-table-2/table/moy-table';
import { FilterType } from 'app/uploader/uploader.utils';
import { INPUT_APPENDS } from '../../uploader-sidebar.config';
import { StringHandler, NumberHandler, DateHandler, AbstractUploaderHandler } from './handlers';

export class UploaderColumnTypeManager {
  inputs: { [column: string]: AbstractUploaderHandler } = {};

  private typeHandlers = {
    [FilterType.String]: StringHandler,
    [FilterType.Number]: NumberHandler,
    [FilterType.Date]: DateHandler,
  };

  updateColumnType(column: string, type: FilterType): AbstractUploaderHandler {
    this.inputs[column] = new this.typeHandlers[type](column);
    return this.inputs[column];
  }
}
