export enum MoyButtonType {
  Round = 'round',
}

export abstract class MoyButton {
  icon?: string;
  click: () => any;

  get type(): MoyButtonType {
    return this._type;
  }

  constructor(opts: Partial<MoyButton>) {
    this.icon = opts.icon || '';
    this.click = opts.click || (() => {});
  }

  protected _type: MoyButtonType;
}

export class MoyButtonRound extends MoyButton {
  constructor(opts: Partial<MoyButton>) {
    super(opts);
    this._type = MoyButtonType.Round;
  }
}
