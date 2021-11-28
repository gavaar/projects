import { Input, Component, ChangeDetectionStrategy } from '@angular/core';
import { MoySelect } from './moy-select';

@Component({
  selector: 'moy-select',
  templateUrl: './moy-select.component.html',
  styleUrls: ['./moy-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoySelectComponent {
  @Input() config: MoySelect;

  selectOptionFn = (index: number) => index;
}
