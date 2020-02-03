import { AbstractMoyButton } from '../moy-button/moy-button.models';

export class MoyHeaderConfig {
  title: string;
  titleIcon?: string;
  suffixButtons?: AbstractMoyButton[];

  constructor(opts: Partial<MoyHeaderConfig>) {
    this.title = opts.title;
    this.titleIcon = opts.titleIcon;
    this.suffixButtons = opts.suffixButtons || [];
    this.onTitleClick = opts.onTitleClick || (() => {});
  }

  onTitleClick: () => any;
}
