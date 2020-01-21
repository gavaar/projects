import { ChangeDetectionStrategy, Component } from '@angular/core';
import { cards, inputs } from './home.config';
import { HomeStore } from './home.store';

@Component({
  selector: 'moy-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [HomeStore],
})
export class HomeComponent {
  cards = cards;
  inputs = inputs;

  constructor(public store: HomeStore) {}
}
