import { MoyButtonRound } from '@libs/moy-button/moy-button.models';
import { AbstractMoyCard, ExpandableMoyCard, MoyCard } from '@libs/moy-card/moy-card.models';
import { MoyInput, MoyInputNumber } from '@libs/moy-input/moy-input.models';

const cards: { [card: string]: AbstractMoyCard } = {
  first: new ExpandableMoyCard({
    title: 'Summary',
    suffixButtons: [
      new MoyButtonRound({
        icon: 'view_list',
        click() {
          this.icon = this.icon === 'view_list' ? 'timeline' : 'view_list';
        },
      }),
    ],
  }),
  second: new MoyCard({ title: 'Add Income' }),
};

const inputs = {
  description: new MoyInput({ label: 'Description', placeholder: 'Rent July' }),
  amount: new MoyInputNumber({ label: 'Amount', placeholder: '17.45' }),
  tags: new MoyInput({ label: 'Tags', placeholder: 'rent, july, madrid' }),
};

export { cards, inputs };
