import { MoyButtonRound } from '@libs/moy-button/moy-button.models';
import { AbstractMoyCard, ExpandableMoyCard, MoyCard } from '@libs/moy-card/moy-card.models';
import { MoyInput, MoyInputNumber } from '@libs/moy-input/moy-input.models';
import { MoyTable } from '@libs/moy-table/moy-table.models';
import { Income } from '../transaction/transaction.models';

const cards: { [card: string]: AbstractMoyCard } = {
  add: new MoyCard({ title: 'Add Income' }),
  recently_added: new ExpandableMoyCard({
    title: 'Recent Movements',
    suffixButtons: [
      new MoyButtonRound({
        icon: 'timeline',
        click() {
          this.icon = this.icon === 'view_list' ? 'timeline' : 'view_list';
        },
      }),
    ],
  }),
};

const table = delCallback =>
  new MoyTable<Income>({
    columns: {
      description: { type: MoyInput },
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
    customColumnText: { delete: ' ' },
    editableRows: true,
    maxRows: 10,
  });

export { cards, table };
