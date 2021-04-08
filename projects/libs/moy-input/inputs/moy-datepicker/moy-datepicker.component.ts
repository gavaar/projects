import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MoyDatepicker } from './moy-datepicker';
import { MoyDateUtil } from './moy-date.util';

@Component({
  selector: 'moy-datepicker',
  templateUrl: './moy-datepicker.component.html',
  styleUrls: ['./moy-datepicker.component.scss', '../moy-typed-input/moy-typed-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoyDatePickerComponent {
  @Input() config: MoyDatepicker;

  inputs = {
    text: new FormControl({ value: '', disabled: true }),
    before: new FormControl(),
    after: new FormControl(),
  };

  onDateChange(who: 'before' | 'after', { value }: { value: string }) {
    if (this.inputs[who].value !== value && value) {
      this.inputs[who].setValue(value);
      const textValue = MoyDateUtil.dateRangeString([this.inputs.before.value, this.inputs.after.value]);
      this.inputs.text.setValue(textValue);
      this.config.control.patchValue({
        before: this.inputs.before.value,
        after: this.inputs.after.value,
      });
    }
  }
}
