import { AbstractMoyInput } from '../input.abstract';
import { InputInterface, InputType } from '../models';

/**
 * For this to work, `HttpClientModule`, `Angular Material` and `<link href="https://fonts.googleapis.com/css2?family=Material+Icons" rel="stylesheet">`
 * all have to be imported in `AppModule` / `index.html`
 */
export class MoySelectIcon extends AbstractMoyInput<string> {
  type = InputType.SelectIcon;
  floatingLabel = true;

  constructor(config: InputInterface<string>) {
    super(config);
  }
}
