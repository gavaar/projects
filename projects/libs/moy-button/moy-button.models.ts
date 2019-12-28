export enum MoyButtonType {
  Round = 'round',
}

export abstract class AbstractMoyButton {
  icon?: string;
  svgIcon?: string;
  click: () => any;

  get type(): MoyButtonType {
    return this._type;
  }

  constructor(opts: Partial<AbstractMoyButton>) {
    this.icon = opts.icon || '';
    this.svgIcon = opts.svgIcon || '';
    this.click = opts.click || (() => {});
  }

  protected _type: MoyButtonType;
}

export class MoyButton extends AbstractMoyButton {
  text?: string;

  constructor(opts: Partial<MoyButton>) {
    super(opts);
    this.text = opts.text;
  }
}

export class MoyButtonRound extends AbstractMoyButton {
  constructor(opts: Partial<MoyButtonRound>) {
    super(opts);
    this._type = MoyButtonType.Round;
  }
}
