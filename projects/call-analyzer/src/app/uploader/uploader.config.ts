import { MoyInput } from '@libs/moy-input/moy-input.models';
import { MergeStrategy } from '@libs/moy-table/row/row.models';

export default () => ({
  noDataMessage: 'Sube un csv para analizarlo!',
  columns: {
    source: { type: MoyInput },
    target: { type: MoyInput },
    date: { type: MoyInput },
    duration: { type: MoyInput },
    user: { type: MoyInput },
    troncal: { type: MoyInput },
  },
  mergeStrategy: {
    source: MergeStrategy.Pivot,
    date: MergeStrategy.Last,
    duration: MergeStrategy.Sum,
  }
});
