import { MoyButtonRound } from '@libs/moy-button/moy-button.models';
import { AbstractMoyCard, ExpandableMoyCard, MoyCard } from '@libs/moy-card/moy-card.models';
import { MoyInput } from '@libs/moy-input/moy-input.models';

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
  second: new MoyCard({ title: 'Second Card' }),
};

const inputs = {
  title: new MoyInput({ label: 'label test' }),
  test: new MoyInput({ placeholder: 'test', value: 'hi' }),
  test2: new MoyInput({ label: 'test', placeholder: 'test', value: 'hi' }),
};

export { cards, inputs };
