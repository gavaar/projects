import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { InputType } from '@libs/moy-input/moy-input.models';
import { MoyTable } from '@libs/moy-table/moy-table.models';
import * as config from './home.config';
import { Income } from './home.models';
import { HomeService } from './home.service';
import { HomeStore } from './home.store';

@Component({
  selector: 'moy-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [HomeStore, HomeService],
})
export class HomeComponent {
  cards = config.cards;
  recentlyAdded = new MoyTable<Income>({
    columnsToShow: {
      description: InputType.Text,
      amount: InputType.Number,
      date: InputType.Text,
    },
    editableRows: true,
  });

  constructor(public store: HomeStore, private service: HomeService, private _snack: MatSnackBar) {}

  ngOnInit() {
    this.service.getTableData().subscribe(recentlyAdded => this.recentlyAdded.addRows(recentlyAdded));
  }

  recentFn = index => index;

  pushToRecentlyAdded(income: Income): void {
    this.recentlyAdded.addRows([income]);
    this._snack.open(`successfully added ${income.description}`);
  }
}
