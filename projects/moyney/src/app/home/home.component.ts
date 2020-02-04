import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Income } from './home-models';
import * as config from './home.config';
import { HomeStore } from './home.store';

@Component({
  selector: 'moy-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [HomeStore],
})
export class HomeComponent {
  cards = config.cards;
  recentlyAdded = [];

  constructor(public store: HomeStore) {}

  recentFn = index => index;

  pushToRecentlyAdded(income: Income): void {
    this.recentlyAdded = [...this.recentlyAdded, income];
    if (this.recentlyAdded.length > 5) {
      this.recentlyAdded.shift();
    }
    alert(`successfully added ${income.description}`);
  }
}
