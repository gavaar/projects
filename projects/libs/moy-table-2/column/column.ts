import { AbstractMoyInput, InputInterface } from '../../moy-input';

export class MoyColumnConfig {
  class: { new(t: Partial<InputInterface<any>>): AbstractMoyInput<any> };
  controlOptions: { disabled: boolean };
};
