import { AbstractMoyButton } from '../moy-button/moy-button.models';

export class MoyHeaderConfig {
  title: string;
  suffixButtons?: AbstractMoyButton[];

  constructor(opts: Partial<MoyHeaderConfig>) {
    this.title = opts.title;
    this.suffixButtons = opts.suffixButtons || [];
  }
}
