import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MoyButton, MoyButtonType } from './moy-button.models';

@Component({
  selector: 'moy-button',
  templateUrl: './moy-button.component.html',
  styleUrls: ['./moy-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoyButtonComponent {
  @Input() config: MoyButton;
  @Output() click = new EventEmitter();

  MoyButtonType = MoyButtonType;

  onClick() {
    this.click.emit();
  }
}
