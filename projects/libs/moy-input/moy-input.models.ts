import { FormControl, Validators } from '@angular/forms';

enum InputTypes {
  Text = 'text',
  Number = 'number',
}

interface InputInterface<T> {
  value?: T;
  placeholder?: string;
  label?: string;
  controlOptions?: {
    required?: boolean;
  };
}

abstract class AbstractMoyInput<T> {
  control?: FormControl;
  placeholder?: string;
  label?: string;
  floatingLabel = false;

  readonly type: InputTypes;

  constructor(p: Partial<InputInterface<T>> = {}) {
    this.control = new FormControl(p.value, p.controlOptions.required ? [Validators.required] : []);
    this.label = p.label;
    this.placeholder = p.placeholder || '';
    this.floatingLabel = p.value != null;
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
