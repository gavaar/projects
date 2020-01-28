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
  inputs = config.inputs;
  buttons = config.buttons;

  private form = new FormArray(Object.values(this.inputs).map(i => i.control));

  constructor(public store: HomeStore) {}

  onAdd() {
    console.log(this.form.value);
  }
}
