import { AbstractMoyInput } from '../input.abstract';
import { InputType } from '../models';

export class MoyDatepicker extends AbstractMoyInput<{ before: string, after: string }> {
  type = InputType.Date;
  floatingLabel = true;
}
