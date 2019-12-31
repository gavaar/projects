import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HomeStore } from './home.store';

@Component({
  selector: 'moy-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [HomeStore],
})
export class HomeComponent {
  constructor(public store: HomeStore) {}
}
