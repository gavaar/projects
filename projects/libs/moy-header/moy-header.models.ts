import { MoyButton } from '../moy-button/moy-button.models';

export class MoyHeaderConfig {
  title: string;
  suffixButtons?: MoyButton[];

  constructor(opts: Partial<MoyHeaderConfig>) {
    this.title = opts.title;
    this.suffixButtons = opts.suffixButtons || [];
  }
}
