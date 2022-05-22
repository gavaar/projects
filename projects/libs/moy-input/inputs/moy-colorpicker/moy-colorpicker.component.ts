import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MoyColorpicker } from '.';

@Component({
  selector: 'moy-colorpicker',
  templateUrl: 'moy-colorpicker.component.html',
  styleUrls: ['moy-colorpicker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoyColorpickerComponent {
  @Input() config: MoyColorpicker;
}
