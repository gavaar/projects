import { AbstractMoyInput } from '../input.abstract';
import { InputInterface, InputType } from '../models';

export interface ToggleInterface extends InputInterface<boolean> {}

export class MoyToggle extends AbstractMoyInput<boolean> {
  type = InputType.Toggle;
  floatingLabel = false;

  constructor(config?: ToggleInterface) {
    super(config as InputInterface<boolean>);
  }
}
