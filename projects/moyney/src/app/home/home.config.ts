import { MoyButtonRound } from '@libs/moy-button/moy-button.models';
import { AbstractMoyCard, ExpandableMoyCard, MoyCard } from '@libs/moy-card/moy-card.models';

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

export { cards };
