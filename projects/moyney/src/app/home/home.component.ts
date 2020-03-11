import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { debounceTime, switchMap } from 'rxjs/operators';
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
  recentlyAdded = config.table;

  constructor(public store: HomeStore, private service: HomeService, private _snack: MatSnackBar) {}

  ngOnInit() {
    this.service.getTableData().subscribe(recentRows => this.recentlyAdded.addRows(recentRows));
    this.recentlyAdded
      .rowChanges()
      .pipe(debounceTime(500), switchMap(this.service.updateIncome))
      .subscribe(income => this._snack.open(`successfully updated ${income.description}`));
  }

  recentFn = index => index;

  pushToRecentlyAdded(income: Income): void {
    this.recentlyAdded.addRows([income]);
    this._snack.open(`successfully added ${income.description}`);
  }
}
