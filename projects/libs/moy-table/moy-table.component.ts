import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MoyButtonType } from '@libs/moy-button/moy-button.models';
import { InputType } from '@libs/moy-input/moy-input.models';
import { AbstractMoyTable } from './moy-table.abstract';

@Component({
  selector: 'moy-table',
  templateUrl: './moy-table.component.html',
  styleUrls: ['./moy-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoyTableComponent {
  @Input() config: AbstractMoyTable<any>;
  @Output() rowChanges = new EventEmitter<{ change: any; id: string }>();

  InputType = InputType;
  MoyButtonType = MoyButtonType;

  columnFn = (index: number) => index;
}
