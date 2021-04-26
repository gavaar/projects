import { AbstractMoyRow } from '../row.abstract';
import { MoyInnerRowConfig } from '../interfaces';

export class MoyInnerRow<Model> extends AbstractMoyRow<Model> {
  innerValues: Model[];
  open: boolean;

  constructor(config: MoyInnerRowConfig<Model>) {
    super(config);
    this.innerValues = config.innerValues;
  }
}
