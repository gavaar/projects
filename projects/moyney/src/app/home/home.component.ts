import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormArray } from '@angular/forms';
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

  constructor(public store: HomeStore) {}
}
