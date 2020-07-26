import { Injectable } from '@angular/core';
import { MoyTable } from '@libs/moy-table/moy-table.models';
import { Store } from '../store';
import { Income } from '../transaction/transaction.models';

export interface HomeState {
  recentlyAddedTable: MoyTable<Income>;
}

@Injectable()
export class HomeStore extends Store<HomeState> {}
