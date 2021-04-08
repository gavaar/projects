import { AbstractMoyInput } from '../input.abstract';
import { InputType } from '../models';

export class MoyInputNumber extends AbstractMoyInput<string> {
  type = InputType.Number;
}
