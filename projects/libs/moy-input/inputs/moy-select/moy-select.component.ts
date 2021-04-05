import { Input, Component, OnInit, Output, EventEmitter } from '@angular/core';
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
  ]
})
export class MoySelectComponent {
  @Input() config: MoySelect;

  selectOptionFn = (index: number) => index;
}
