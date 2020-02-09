import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AbstractMoyTable } from './moy-table.models';

@Component({
  selector: 'moy-table',
  templateUrl: './moy-table.component.html',
  styleUrls: ['./moy-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoyTableComponent {
  @Input() config: AbstractMoyTable<any>;

  columnFn = (index: number) => index;
  isPair = index => index % 2 === 0;
  isNotPair = index => index % 2 !== 0;
}
