export enum MoyButtonType {
  Round = 'round',
}

export abstract class AbstractMoyButton {
  icon?: string;
  svgIcon?: string;
  click?: () => any;
  readonly type: MoyButtonType;

  constructor(opts: Partial<AbstractMoyButton>) {
    this.icon = opts.icon || '';
    this.svgIcon = opts.svgIcon || '';
    this.click = opts.click || (() => {});
  }
}

export class MoyButton extends AbstractMoyButton {
  text?: string;

  constructor(opts: Partial<MoyButton>) {
    super(opts);
    this.text = opts.text;
  }
}

export class MoyButtonRound extends AbstractMoyButton {
  type = MoyButtonType.Round;

  constructor(opts: Partial<MoyButtonRound>) {
    super(opts);
  }
}
