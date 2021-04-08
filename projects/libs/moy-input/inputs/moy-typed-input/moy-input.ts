import { AbstractMoyInput } from '../input.abstract';
import { InputType } from '../models';

export class MoyInput extends AbstractMoyInput<string> {
  type = InputType.Text;
}
