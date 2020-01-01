import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractMoyButton } from '@libs/moy-button/moy-button.models';
import { MoyHeaderConfig } from './moy-header.models';

@Component({
  selector: 'moy-header',
  templateUrl: './moy-header.component.html',
  styleUrls: ['./moy-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoyHeaderComponent {
  @Input() config: MoyHeaderConfig;
  @Output() buttonClick = new EventEmitter<AbstractMoyButton>();

  suffixButtonFn = (index: number) => index;

  onButtonClick(index: number): void {
    this.buttonClick.emit(this.config.suffixButtons[index]);
  }
}
