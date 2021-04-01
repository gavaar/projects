import { AbstractMoyInput } from '../input.abstract';
import { InputInterface, InputType } from '../models';

export interface SelectInterface<T> extends InputInterface<T> {
  selectOptions: { value: T, label: string }[];
}

export class MoySelect<T> extends AbstractMoyInput<T> {
  type = InputType.Select;
  selectOptions: { value: T, label: string }[];

  constructor(config: SelectInterface<T>) {
    super(config);
    this.selectOptions = config.selectOptions;
  }
}
