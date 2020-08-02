interface MoyButtonConfig {
  icon?: string;
  svgIcon?: string;
  click?: () => any;
  blur?: () => any;
}

enum MoyButtonType {
  Round = 'button_round',
}

abstract class AbstractMoyButton {
  icon?: string;
  svgIcon?: string;
  text?: string;
  click?: () => any;
  blur?: () => any;
  readonly type: MoyButtonType;

  constructor(opts: MoyButtonConfig) {
    this.icon = opts.icon || '';
    this.svgIcon = opts.svgIcon || '';
    this.click = opts.click || (() => {});
    this.blur = opts.blur || (() => {});
  }

  setIcon(icon: string) {
    this.icon = icon;
  }
}

class MoyButton extends AbstractMoyButton {
  text?: string;

  constructor(opts: { text: string } & MoyButtonConfig) {
    super(opts);
    this.text = opts.text;
  }
}

class MoyButtonRound extends AbstractMoyButton {
  type = MoyButtonType.Round;

  constructor(opts: MoyButtonConfig) {
    super(opts);
  }
}

export { MoyButtonConfig, MoyButtonType, AbstractMoyButton, MoyButton, MoyButtonRound };
