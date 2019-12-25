import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MoyFooterConfig } from './moy-footer.models';

@Component({
  selector: 'moy-footer',
  templateUrl: './moy-footer.component.html',
  styleUrls: ['./moy-footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoyFooterComponent {
  @Input() config: MoyFooterConfig;
}
