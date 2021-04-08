import { AbstractMoyInput } from '../input.abstract';
import { InputInterface, InputType } from '../models';

export interface SelectInterface extends InputInterface<string> {
  selectOptions: { value: string, label: string }[];
}

export class MoySelect extends AbstractMoyInput<string> {
  type = InputType.Select;
  selectOptions: { value: string, label: string }[];

  constructor(config: SelectInterface) {
    super(config);
    this.selectOptions = config.selectOptions;
  }
}
