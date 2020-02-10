import { FormControl, Validators } from '@angular/forms';

enum InputTypes {
  Text = 'text',
  Number = 'number',
}

interface InputInterface<T> {
  value?: T;
  placeholder?: string;
  label?: string;
  autofocus?: boolean;
  controlOptions?: {
    required?: boolean;
  };
}

abstract class AbstractMoyInput<T> {
  control?: FormControl;
  placeholder?: string;
  label?: string;
  floatingLabel = false;
  autofocus = false;

  readonly type: InputTypes;

  constructor(p: Partial<InputInterface<T>> = {}) {
    this.control = new FormControl(p.value, (p.controlOptions || {}).required ? [Validators.required] : []);
    this.label = p.label;
    this.placeholder = p.placeholder || '';
    this.floatingLabel = p.value != null;
    this.autofocus = p.autofocus;
  }

  onFocus() {
    this.floatingLabel = true;
  }

  onBlur() {
    this.floatingLabel = this.control.value;
  }
}

class MoyInput extends AbstractMoyInput<string> {
  type = InputTypes.Text;
}

class MoyInputNumber extends AbstractMoyInput<number> {
  type = InputTypes.Number;
}

export { InputTypes, AbstractMoyInput, MoyInput, MoyInputNumber };
