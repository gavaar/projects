import { AbstractControlOptions } from '@angular/forms';

export enum InputType {
  Text = 'text',
  Textarea = 'textarea',
  Number = 'number',
  Select = 'select',
  SelectImg = 'select_image',
  SelectIcon = 'select_icon',
  Date = 'date',
  File = 'file',
  Toggle = 'toggle',
  Color = 'color',
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
