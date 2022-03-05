import { AbstractMoyInput } from '../';
import { InputType } from '../models';

export class MoyTextarea extends AbstractMoyInput<string> {
  type = InputType.Textarea;
}
