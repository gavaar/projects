interface MoyButtonConfig {
  icon?: string;
  svgIcon?: string;
}

enum MoyButtonType {
  Round = 'button_round',
  Toggle = 'button_toggle',
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

class MoyButtonToggle extends MoyButton {
  type = MoyButtonType.Toggle;
  pressed = false;

  constructor(opts) {
    super(opts);
  }

  click = () => {
    this.pressed = !this.pressed;
  }
}

export { MoyButtonConfig, MoyButtonType, AbstractMoyButton, MoyButton, MoyButtonRound, MoyButtonToggle };
