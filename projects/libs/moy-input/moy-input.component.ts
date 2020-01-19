import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AbstractMoyInput } from './moy-input.models';

@Component({
  selector: 'moy-input',
  templateUrl: './moy-input.component.html',
  styleUrls: ['./moy-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoyInputComponent {
  @Input() config: AbstractMoyInput<any>;
}
