import { AbstractControlOptions } from '@angular/forms';

export enum InputType {
  Text = 'text',
  Number = 'number',
  Select = 'select',
}

export interface InputInterface<T> {
  id?: string;
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
