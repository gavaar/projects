import { AbstractControlOptions, FormControl, Validators } from '@angular/forms';

enum InputType {
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
    disabled?: boolean;
    updateOn?: AbstractControlOptions['updateOn'];
  };
}

abstract class AbstractMoyInput<T> {
  control?: FormControl;
  placeholder?: string;
  label?: string;
  floatingLabel = false;
  autofocus = false;

  readonly type: InputType;

  constructor(p: Partial<InputInterface<T>> = {}) {
    const options = p.controlOptions || {};
    const controlValue = { value: p.value, disabled: options.disabled };
    const validators = options.required ? [Validators.required] : [];
    const updateOn = options.updateOn || 'change';
    this.control = new FormControl(controlValue, { validators, updateOn });
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
  type = InputType.Text;
}

class MoyInputNumber extends AbstractMoyInput<number> {
  type = InputType.Number;
}

export { InputType, InputInterface, AbstractMoyInput, MoyInput, MoyInputNumber };
