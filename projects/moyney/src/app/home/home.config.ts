import { MoyButtonRound } from '@libs/moy-button/moy-button.models';
import { AbstractMoyCard, ExpandableMoyCard, MoyCard } from '@libs/moy-card/moy-card.models';

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

export { cards };
