import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MoyTextarea } from '.';

@Component({
  selector: 'moy-textarea',
  templateUrl: './moy-textarea.component.html',
  styleUrls: ['./moy-textarea.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoyTextareaComponent {
  @Input() config: MoyTextarea;  
}
