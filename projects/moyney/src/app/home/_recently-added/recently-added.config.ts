import { MoyButtonRound } from '@libs/moy-button/moy-button.models';
import { MoyInput, MoyInputNumber } from '@libs/moy-input/moy-input.models';
import { MergeStrategy } from '@libs/moy-table/moy-table.abstract';
import { MoyTable } from '@libs/moy-table/moy-table.models';
import { Income } from '../../transaction/transaction.models';

const buildTable = delCallback =>
  new MoyTable<Income>({
    columns: {
      description: { type: MoyInput, config: { controlOptions: { updateOn: 'blur' } } },
      amount: { type: MoyInputNumber },
      date: { type: MoyInput },
      delete: {
        type: MoyButtonRound,
        config: {
          icon: 'delete',
          click() {
            if (this.icon === 'delete') this.icon = 'delete_forever';
            else delCallback(this.__originalRow__);
          },
          blur() {
            this.icon = 'delete';
          },
        },
      },
    },
    mergeStrategy: {
      description: MergeStrategy.Pivot,
      amount: MergeStrategy.Sum,
      date: MergeStrategy.Last,
    },
    customColumnText: { delete: ' ' },
    editableRows: true,
    maxRows: 10,
  });

export { buildTable };
