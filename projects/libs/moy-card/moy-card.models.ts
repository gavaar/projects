import { AbstractMoyButton } from '@libs/moy-button/moy-button.models';

export enum MoyCardType {
  Expandable = 'expandable',
}

export abstract class AbstractMoyCard {
  title: string;
  readonly type: MoyCardType;

  suffixButtons?: AbstractMoyButton[] = [];
  showContent?: boolean | null;
  toggleView?(): void | null;

  constructor(config: Partial<AbstractMoyCard>) {
    this.title = config.title || '';
    this.suffixButtons = config.suffixButtons;
  }
}

export class MoyCard extends AbstractMoyCard {}

export class ExpandableMoyCard extends AbstractMoyCard {
  type = MoyCardType.Expandable;

  private _showContent = true;

  get showContent() {
    return this._showContent;
  }

  constructor(config: Partial<ExpandableMoyCard>) {
    super(config);
  }

  toggleView(): void {
    this._showContent = !this._showContent;
  }
}
