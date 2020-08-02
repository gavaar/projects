import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HomeStore } from '../home.store';

@Component({
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SummaryComponent implements OnInit, OnDestroy {
  private _destroy$ = new Subject();

  constructor(public store: HomeStore) {}

  ngOnInit() {
    this.store.incomeChanges.pipe(takeUntil(this._destroy$)).subscribe(incomes => {
      const _totalIncomes = incomes.reduce(
        (sum, income) => {
          if (+income.amount > 0) sum.incomes += +income.amount;
          else sum.outcomes -= income.amount;
          return sum;
        },
        { incomes: 0, outcomes: 0 },
      );

      this.store.summaryCharts.monthly.setNewTotal(_totalIncomes.incomes);
      this.store.summaryCharts.monthly.setLoaded(_totalIncomes.outcomes);
      this.store.summaryCharts.monthly.setLoading(0);
    });

    this.store.summaryCharts.accumulated_index.setNewTotal(220.54);
    this.store.summaryCharts.accumulated_index.setLoaded(13.88);
    const _daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
    const _dayOfToday = new Date().getDate();
    this.store.summaryCharts.accumulated_index.setLoading((220.54 / _daysInMonth) * _dayOfToday - 13.88);
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
