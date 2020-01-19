import { FormControl } from '@angular/forms';

interface InputInterface<T> {
  value?: T;
  placeholder?: string;
  label?: string;
}

export abstract class AbstractMoyInput<T> {
  control?: FormControl;
  placeholder?: string;
  label?: string;

  floatingLabel = false;

  constructor(p: Partial<InputInterface<T>> = {}) {
    this.control = new FormControl(p.value);
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

export class MoyInput extends AbstractMoyInput<string> {}
