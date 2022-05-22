import { AbstractMoyButton } from '../moy-button/moy-button.models';

const defaultConfig: MoyHeaderConfig = Object.freeze({
  title: '',
  titleIcon: '',
  titleImgURI: '',
  suffixButtons: [],
  onTitleClick: () => {},
});

export class MoyHeaderConfig {
  title: string;
  titleIcon?: string;
  titleImgURI?: string;
  suffixButtons?: AbstractMoyButton[];

  constructor(opts: Partial<MoyHeaderConfig>) {
    for (let k in defaultConfig) {
      this[k] = opts[k] || defaultConfig[k];
    }
  }

  onTitleClick: () => any;
}
