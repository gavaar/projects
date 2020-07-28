import { AbstractMoyButton } from '../moy-button/moy-button.models';

export class MoyHeaderConfig {
  title: string;
  titleIcon?: string;
  titleImgURI?: string;
  suffixButtons?: AbstractMoyButton[];

  constructor(opts: Partial<MoyHeaderConfig>) {
    this.title = opts.title;
    this.titleIcon = opts.titleIcon;
    this.titleImgURI = opts.titleImgURI;
    this.suffixButtons = opts.suffixButtons || [];
    this.onTitleClick = opts.onTitleClick || (() => {});
  }

  onTitleClick: () => any;
}
