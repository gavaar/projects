import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AbstractMoyLoadingBar } from './moy-loading-bar.models';

@Component({
  selector: 'moy-loading-bar',
  templateUrl: './moy-loading-bar.component.html',
  styleUrls: ['./moy-loading-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoyLoadingBarComponent {
  @Input() config: AbstractMoyLoadingBar;
}
