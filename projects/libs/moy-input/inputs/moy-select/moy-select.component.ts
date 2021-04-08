import { Input, Component, ChangeDetectionStrategy } from '@angular/core';
import { MoySelect } from './moy-select';

@Component({
  selector: 'moy-select',
  templateUrl: './moy-select.component.html',
  styles: [
    `.MoyInput__select {
        min-width: 7rem;
        border-color: lightgrey;
        padding: 0.2rem;
    }`
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoySelectComponent {
  @Input() config: MoySelect;

  selectOptionFn = (index: number) => index;
}
