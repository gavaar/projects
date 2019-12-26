import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MoyHeaderConfig } from './moy-header.models';

@Component({
  selector: 'moy-header',
  templateUrl: './moy-header.component.html',
  styleUrls: ['./moy-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoyHeaderComponent {
  @Input() config: MoyHeaderConfig;
}
