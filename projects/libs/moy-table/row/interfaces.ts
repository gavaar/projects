import { MoyTableConfig } from '../table';

export type MoyRowConfig<Model> = MoyTableConfig<Model> & { value: Model };
export type MoyInnerRowConfig<Model> = MoyRowConfig<Model> & { innerValues: Model[] };
