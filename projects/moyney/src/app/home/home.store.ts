import { Injectable } from '@angular/core';
import { AbstractMoyLoadingBar, MoyLoadingBar } from '@libs/moy-loading-bar/moy-loading-bar.models';
import { MoyTable } from '@libs/moy-table/moy-table.models';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, map, takeUntil } from 'rxjs/operators';
import { Store } from '../store';
import { Income } from '../transaction/transaction.models';

const summaries = {
  monthly: new MoyLoadingBar(),
  accumulated_index: new MoyLoadingBar({ title: 'Placeholder' }),
};

export interface HomeState {
  recentlyAddedTable: MoyTable<Income>;
  summaryCharts: { [chartName: string]: AbstractMoyLoadingBar };
  incomes: Income[];
}

@Injectable()
export class HomeStore extends Store<HomeState> {
  private _changes: BehaviorSubject<Income[]>;
  private _summaryCharts = summaries;
  private _recentlyAddedTable: MoyTable<Income>;
  /**
   * List of Incomes
   */
  get incomes(): Income[] {
    return [...this.state.incomes];
  }
  set incomes(incomes: Income[]) {
    this.state = { incomes };
  }

  get incomeChanges() {
    return this._changes.asObservable();
  }
  /**
   * Summary Charts to be shown
   */
  get summaryCharts(): HomeState['summaryCharts'] {
    return this._summaryCharts;
  }
  /**
   * RecentlyAddedTable
   */
  get recentlyAddedTable(): MoyTable<Income> {
    return this._recentlyAddedTable;
  }
  set recentlyAddedTable(t: MoyTable<Income>) {
    this._recentlyAddedTable = t;
  }

  onInit() {
    this._changes = new BehaviorSubject<Income[]>([]);
    if (!this.state.incomes) {
      this.state = { incomes: [] };
    }
    this.stateChanges
      .pipe(
        takeUntil(this._destroy$),
        map(state => state.incomes),
        distinctUntilChanged((a, b) => a === b),
      )
      .subscribe(incomes => this._changes.next(incomes));
  }

  onDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
