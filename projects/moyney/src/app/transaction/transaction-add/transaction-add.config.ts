import { MoyButtonRound } from '@libs/moy-button/moy-button.models';
import { MoyInput, MoyInputNumber } from '@libs/moy-input/moy-input.models';

const controlOptions = { required: true };

const inputs = {
  description: new MoyInput({ controlOptions, label: 'Description', placeholder: 'Rent July', autofocus: true }),
  amount: new MoyInputNumber({ controlOptions, label: 'Amount', placeholder: `${(Math.random() * 100).toFixed(2)}` }),
  tags: new MoyInput({ controlOptions, label: 'Tags', placeholder: 'rent, july, madrid' }),
};

const buttons = {
  addFinance: new MoyButtonRound({ icon: 'add_circle_outline' }),
};

export { inputs, buttons };
