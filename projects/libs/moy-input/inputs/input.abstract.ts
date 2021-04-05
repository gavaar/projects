import { FormControl, Validators } from '@angular/forms';
import { InputInterface, InputType } from './models';

export abstract class AbstractMoyInput<T> {
  id? = null;
  control?: FormControl;
  placeholder?: string;
  label?: string;
  floatingLabel = false;
  autofocus = false;

  readonly abstract type: InputType;

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
    this.id = p.id;
  }

  onFocus() {
    this.floatingLabel = true;
  }

  onBlur() {
    this.floatingLabel = this.control.value;
  }

  setFocus() { }
}
