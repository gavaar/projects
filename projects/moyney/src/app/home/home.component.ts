import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { debounceTime, filter, switchMap } from 'rxjs/operators';
import { Income } from '../transaction/transaction.models';
import { TransactionService } from '../transaction/transaction.service';
import * as config from './home.config';
import { HomeStore } from './home.store';

@Component({
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
    this.recentlyAdded.setLoading();
    this._service.get().subscribe(recentRows => {
      this.recentlyAdded.addRows(recentRows.reverse());
    });
    this.recentlyAdded
      .rowChanges()
      .pipe(
        debounceTime(1000),
        filter(changes => {
          const emptyValues = Object.values(changes).filter(value => !value);
          if (emptyValues.length) {
            this._snack.open(`Can't update: don't leave blank values for ${changes.__prevState__.description}`);
            return false;
          }
          return true;
        }),
        switchMap(this._service.patch),
      )
      .subscribe(income => {
        this.recentlyAdded.addRows([]);
        this._snack.open(`Successfully updated ${income.description}`);
      });
  }

  recentFn = index => index;

  pushToRecentlyAdded(income: Income): void {
    this.recentlyAdded.addRows([income]);
    this._snack.open(`Successfully added ${income.description}`);
  }

  onDelete(income: Income) {
    this.recentlyAdded.removeRows([income]);
    this._service.delete(income).subscribe(_ => this._snack.open(`Deleted ${income.description}`));
  }
}
