import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { debounceTime, switchMap } from 'rxjs/operators';
import { Income } from '../transaction/transaction.models';
import { TransactionService } from '../transaction/transaction.service';
import * as config from './home.config';
import { HomeStore } from './home.store';

@Component({
  selector: 'moy-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [HomeStore],
  viewProviders: [TransactionService],
})
export class HomeComponent {
  cards = config.cards;
  recentlyAdded = config.table(row => this.onDelete(row));

  constructor(public store: HomeStore, private _service: TransactionService, private _snack: MatSnackBar) {}

  ngOnInit() {
    this._service.get().subscribe(recentRows => this.recentlyAdded.addRows(recentRows));
    this.recentlyAdded
      .rowChanges()
      .pipe(debounceTime(500), switchMap(this._service.patch))
      .subscribe(income => this._snack.open(`successfully updated ${income.description}`));
  }

  recentFn = index => index;

  pushToRecentlyAdded(income: Income): void {
    this.recentlyAdded.addRows([income]);
    this._snack.open(`successfully added ${income.description}`);
  }

  onDelete(income: Income) {
    this.recentlyAdded.removeRows([income]);
    this._service.delete(income).subscribe(_ => this._snack.open(`deleted ${income.description}`));
  }
}
