import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { verticalExpandCollapse } from '@libs/animations';
import { MoyButtonType } from '@libs/moy-button/moy-button.models';
import { InputType } from '@libs/moy-input/moy-input.models';
import { AbstractMoyTable } from './moy-table.abstract';
import { RowType } from './row/row.abstract';

@Component({
  selector: 'moy-table',
  templateUrl: './moy-table.component.html',
  styleUrls: ['./moy-table.component.scss'],
  animations: [verticalExpandCollapse],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoyTableComponent {
  @Input() config: AbstractMoyTable<any>;
  @Output() rowChanges = new EventEmitter<{ change: any; id: string }>();

  InputType = InputType;
  RowType = RowType;
  MoyButtonType = MoyButtonType;

  columnFn = (index: number) => index;

  onRowClick(row) {
    console.log(row);
  }
}
