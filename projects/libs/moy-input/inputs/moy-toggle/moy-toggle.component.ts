import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { MoyToggle } from './moy-toggle';

@Component({
  selector: 'moy-toggle',
  templateUrl: './moy-toggle.component.html',
  styleUrls: ['./moy-toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoyToggleComponent {
  @Input() config: MoyToggle;

  toggleValue: Observable<boolean>;

  ngOnInit(): void {
    this.toggleValue = this.config.control.valueChanges.pipe(startWith(this.config.control.value));
  }
}
