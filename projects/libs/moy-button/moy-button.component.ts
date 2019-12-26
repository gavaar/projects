import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MoyButton } from './moy-button.models';

@Component({
  selector: 'moy-button',
  templateUrl: './moy-button.component.html',
  styleUrls: ['./moy-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoyButtonComponent {
  @Input() config: MoyButton;
}
