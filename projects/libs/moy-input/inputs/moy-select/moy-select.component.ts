import { Input, Component } from '@angular/core';
import { MoySelect } from './moy-select';

@Component({
  selector: 'moy-select',
  templateUrl: './moy-select.component.html',
})
export class MoySelectComponent<T> {
  @Input() config: MoySelect<T>;

  selectOptionFn = (index: number) => index;
}
