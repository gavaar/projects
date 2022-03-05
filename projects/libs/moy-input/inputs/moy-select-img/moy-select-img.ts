import { AbstractMoyInput } from '../input.abstract';
import { InputInterface, InputType } from '../models';

export interface SelectImageInterface extends InputInterface<{ value: string, src: string }> {
  options: { value: string, src: string }[];
}

export class MoySelectImage extends AbstractMoyInput<{ value: string, src: string }> {
  type = InputType.SelectImg;
  options: { value: string, src: string }[];

  constructor(config: SelectImageInterface) {
    super(config);
    this.options = config.options;
  }
}
