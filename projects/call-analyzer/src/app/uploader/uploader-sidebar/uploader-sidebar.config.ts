import { FilterType } from '../uploader.utils';

export const INPUT_APPENDS = {
  date: 'fecha',
  numberAfter: 'mayor que',
  numberBefore: 'menor que',
  typeAppend: 'type',
};
export const LS_TYPE_VALUES_TOKEN = 'type_values';
export const SELECT_OPTIONS = [
  { label: 'Número', value: FilterType.Number },
  { label: 'Fecha', value: FilterType.Date },
  { label: 'Texto', value: FilterType.String }
];
