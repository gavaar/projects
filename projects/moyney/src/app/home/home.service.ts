import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Auth } from '../auth';
import { CollectionIncome, Income } from './home.models';

@Injectable()
export class HomeService {
  constructor(private auth: Auth, private db: AngularFirestore) {}

  getTableData(): Observable<Income[]> {
    return this.db
      .collection<CollectionIncome>(`incomes/${this.auth.uid}/income`, i => i.orderBy('date_added', 'desc'))
      .valueChanges({ idField: 'id' })
      .pipe(
        take(1),
        map(incomes => {
          return incomes.map(i => new Income(i));
        }),
      );
  }

  updateIncome = ({ id, description, date, amount, tags }: Income): Observable<Income> => {
    return from(
      this.db
        .collection(`incomes/${this.auth.uid}/income/`)
        .doc(id)
        .update({ description, date, amount }),
    ).pipe(map(_ => ({ id, description, date, amount, tags })));
  };
}
