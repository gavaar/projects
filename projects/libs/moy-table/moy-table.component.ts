import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'moy-table',
  templateUrl: './moy-table.component.html',
  styleUrls: ['./moy-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoyTableComponent {
  @Input() config;

  ngOnInit() {
    console.log(this.config);
  }
}
