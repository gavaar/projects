import { AbstractMoyButton } from '@libs/moy-button/moy-button.models';

interface AbstractMoyCardConfig {
  title: string;
  suffixButtons?: AbstractMoyButton[];
  showContent?: true | null;
}

enum MoyCardType {
  Expandable = 'expandable',
}

abstract class AbstractMoyCard {
  title: string;
  readonly type: MoyCardType;

  suffixButtons?: AbstractMoyButton[] = [];
  showContent?: boolean | null;
  toggleView?(): void;

  constructor(config: Partial<AbstractMoyCardConfig>) {
    this.title = config.title || '';
    this.suffixButtons = config.suffixButtons;
  }
}

class MoyCard extends AbstractMoyCard {}

class ExpandableMoyCard extends AbstractMoyCard {
  type = MoyCardType.Expandable;

  private _showContent = true;

  get showContent() {
    return this._showContent;
  }

  constructor(config: Partial<AbstractMoyCardConfig>) {
    super(config);
  }

  toggleView(): void {
    this._showContent = !this._showContent;
  }
}

export { MoyCardType, AbstractMoyCard, MoyCard, ExpandableMoyCard };
