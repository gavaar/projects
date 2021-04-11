import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { verticalExpandCollapse } from '@libs/animations';
import { MoyTable } from './table/moy-table';

@Component({
  selector: 'moy-table',
  templateUrl: 'moy-table.component.html',
  styleUrls: ['moy-table.component.scss'],
  animations: [verticalExpandCollapse],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoyTableComponent<T> {
  @Input() config: MoyTable<T>;

  rowFn = (index: number) => index;
  columnFn = (index: number) => index;
}
