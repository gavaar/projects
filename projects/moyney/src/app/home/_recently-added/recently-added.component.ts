import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { debounceTime, delay, filter, switchMap, takeUntil } from 'rxjs/operators';
import { Income } from '../../transaction/transaction.models';
import { TransactionService } from '../../transaction/transaction.service';
import { HomeStore } from '../home.store';
import * as config from './recently-added.config';

@Component({
  templateUrl: './recently-added.component.html',
  styleUrls: ['./recently-added.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecentlyAddedComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject();
  private _tableRows = new Map<string, Income>();

  constructor(public store: HomeStore, private transactionService: TransactionService, private _snack: MatSnackBar) {}

  ngOnInit() {
    this.store.recentlyAddedTable = config.buildTable((income: Income) => this.onDelete(income));
    this.store.recentlyAddedTable.setLoading();
    this.store.incomeChanges.pipe(delay(100), takeUntil(this.destroy$)).subscribe(incomes => {
      const _addedIncomes = incomes.filter(_income => {
        if (this._tableRows.has(_income.id)) return false;
        this._tableRows.set(_income.id, _income);
        return true;
      });

      this.store.recentlyAddedTable.addRows(_addedIncomes.reverse());
    });

    this.store.recentlyAddedTable
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

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onDelete(income: Income) {
    this.store.recentlyAddedTable.removeRows([income]);
    this.store.incomes = this.store.incomes.filter(i => i.id !== income.id);
    this.transactionService.delete(income).subscribe(_ => this._snack.open(`Deleted ${income.description}`));
  }
}
