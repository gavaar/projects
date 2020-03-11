import { MoyButtonRound } from '@libs/moy-button/moy-button.models';
import { AbstractMoyCard, ExpandableMoyCard, MoyCard } from '@libs/moy-card/moy-card.models';
import { InputType } from '@libs/moy-input/moy-input.models';
import { MoyTable } from '@libs/moy-table/moy-table.models';
import { Income } from './home.models';

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

const table = new MoyTable<Income>({
  columnsToShow: {
    description: InputType.Text,
    amount: InputType.Number,
    date: InputType.Text,
  },
  editableRows: true,
  maxRows: 10,
});

export { cards, table };
