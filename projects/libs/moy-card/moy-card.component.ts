import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractMoyButton } from '@libs/moy-button/moy-button.models';
import { AbstractMoyCard, MoyCardType } from './moy-card.models';

@Component({
  selector: 'moy-card',
  templateUrl: './moy-card.component.html',
  styleUrls: ['./moy-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoyCardComponent {
  @Input() config: AbstractMoyCard;
  @Output() buttonClick = new EventEmitter<AbstractMoyButton>();

  MoyCardType = MoyCardType;

  suffixBtnFn = index => index;
}
