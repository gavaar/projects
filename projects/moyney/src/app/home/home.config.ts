import { MoyButtonRound } from '@libs/moy-button/moy-button.models';
import { AbstractMoyCard, MoyCard } from '@libs/moy-card/moy-card.models';
import { MoyInput, MoyInputNumber } from '@libs/moy-input/moy-input.models';
import { MergeStrategy } from '@libs/moy-table/moy-table.abstract';
import { MoyTable } from '@libs/moy-table/moy-table.models';
import { Income } from '../transaction/transaction.models';

enum MovementSummaryTitles {
  Summary = 'Summary',
  RecentMovements = 'Recent Movements',
}

function recentlyAddedToSummary() {
  const { icon } = cards.recently_added_and_summary.suffixButtons[0];
  cards.recently_added_and_summary.suffixButtons[0].icon = icon === 'view_list' ? 'timeline' : 'view_list';
  cards.recently_added_and_summary.title =
    icon === 'view_list' ? MovementSummaryTitles.Summary : MovementSummaryTitles.RecentMovements;
}

const cards: { [card: string]: AbstractMoyCard } = {
  add: new MoyCard({ title: 'Add Income' }),
  recently_added_and_summary: new MoyCard({
    title: MovementSummaryTitles.Summary,
    suffixButtons: [
      new MoyButtonRound({
        icon: 'timeline',
        click: recentlyAddedToSummary,
      }),
    ],
  }),
};

const table = delCallback =>
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

export { cards, table, MovementSummaryTitles };
