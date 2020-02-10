import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { MoyTable } from '@libs/moy-table/moy-table.models';
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
  recentlyAdded = new MoyTable<Income>({
    columnsToShow: ['description', 'amount', 'date'],
    editableRows: true,
  });

  constructor(public store: HomeStore, private _snack: MatSnackBar) {}

  ngOnInit() {
    this.recentlyAdded.addRows([
      {
        description: 'Version 1',
        tags: 'hello, friend',
        amount: 12,
        date: `${new Date().getDate()}/${+new Date().getMonth() + 1}/${new Date().getFullYear()}`,
      },
    ]);
  }

  recentFn = index => index;

  pushToRecentlyAdded(income: Income): void {
    this.recentlyAdded.addRows([income]);
    if (this.recentlyAdded.matrix.length > 5) {
      // this.recentlyAdded.shift(); <== add remove method to class
    }
    this._snack.open(`successfully added ${income.description}`);
  }
}
