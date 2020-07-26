import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { debounceTime, filter, switchMap } from 'rxjs/operators';
import { Income } from '../../transaction/transaction.models';
import { TransactionService } from '../../transaction/transaction.service';
import { HomeStore } from '../home.store';
import * as config from './recently-added.config';

@Component({
  templateUrl: './recently-added.component.html',
  styleUrls: ['./recently-added.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecentlyAddedComponent implements OnInit {
  constructor(public store: HomeStore, private transactionService: TransactionService, private _snack: MatSnackBar) {}

  ngOnInit() {
    if (!this.store.state.recentlyAddedTable) {
      this.store.state = {
        recentlyAddedTable: config.buildTable((income: Income) => this.onDelete(income)),
      };
      this.store.state.recentlyAddedTable.setLoading();
      this.transactionService.get().subscribe(recentRows => {
        this.store.state.recentlyAddedTable.addRows(recentRows.reverse());
      });

      this.store.state.recentlyAddedTable
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
          switchMap(this.transactionService.patch),
        )
        .subscribe(({ description }) => this._snack.open(`Successfully updated ${description}`));
    }
  }

  onDelete(income: Income) {
    this.store.state.recentlyAddedTable.removeRows([income]);
    this.transactionService.delete(income).subscribe(_ => this._snack.open(`Deleted ${income.description}`));
  }
}
