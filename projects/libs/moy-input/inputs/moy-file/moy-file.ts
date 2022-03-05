import { AbstractMoyInput } from '../input.abstract';
import { InputInterface, InputType } from '../models';

export interface FileInterface extends InputInterface<string> {
  accept?: string;
}

export class MoyFile extends AbstractMoyInput<string> {
  type = InputType.File;
  accept: string;

  constructor(config: FileInterface = {}) {
    super(config);

    const {
      accept = 'image/*',
    } = config;

    this.accept = accept;
  }
}
