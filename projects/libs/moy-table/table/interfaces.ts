import { MoyColumnConfig } from '../column/column';
import { TableSettings } from '../column/column-manager';

export interface MoyTableConfig<Model> {
  columns: {
    [column in keyof Model]: MoyColumnConfig;
  },
  settings?: TableSettings<Model>;
}

export interface MoyTableFilter<Model> {
  columns: {
    [column in keyof Model]?: (value: Model[column]) => boolean;
  },
  frequency?: {
    lowerThan?: number;
    higherThan?: number;
  }
}
