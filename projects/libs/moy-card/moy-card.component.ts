import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AbstractMoyCard, MoyCardType } from './moy-card.models';

@Component({
  selector: 'moy-card',
  templateUrl: './moy-card.component.html',
  styleUrls: ['./moy-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoyCardComponent {
  @Input() config: AbstractMoyCard;

  MoyCardType = MoyCardType;

  suffixBtnFn = index => index;
}
