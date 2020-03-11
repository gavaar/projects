import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { forkJoin, from, merge, Observable } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { Auth } from '../../auth';
import { Income } from '../home.models';

@Injectable()
export class TransactionAddService {
  private uid = this.auth.uid;
  private incomesRef = this.db.doc(`incomes/${this.uid}`);

  constructor(private auth: Auth, private db: AngularFirestore) {}

  submit({ amount, description, tags: _tags }: Income): Observable<unknown> {
    const tags = _tags.split(',').map(t => t.trim());

    return from(
      this.incomesRef.collection('income').add({
        amount,
        description,
        currency: 'euro',
        date_added: new Date(),
        tags: tags.reduce((tagMap, _tag) => {
          tagMap[_tag] = true;
          return tagMap;
        }, {}),
      }),
    ).pipe(
      concatMap(({ id }) => {
        return forkJoin(
          this.addIncomeToYearly(id),
          this.addIncomeByDescription(description, id),
          this.addIncomeToTags(tags, id),
        );
      }),
    );
  }

  private addIncomeByDescription(description: string, incomeId: string) {
    return from(
      this.incomesRef
        .collection('description')
        .doc(description)
        .set({ [incomeId]: true }, { merge: true }),
    );
  }

  private addIncomeToTags(_tags: string[], incomeId: string) {
    const incomeTagRef = this.incomesRef.collection('tag');

    return merge(
      ..._tags.map(tag => {
        return from(incomeTagRef.doc(tag).set({ [incomeId]: true }, { merge: true }));
      }),
    );
  }

  private addIncomeToYearly(incomeId: string) {
    const date = new Date();
    return from(
      this.incomesRef
        .collection('yearly')
        .doc(`${date.getFullYear()}`)
        .collection('monthly')
        .doc(`${date.getMonth()}`)
        .set({ [incomeId]: true }, { merge: true }),
    );
  }
}
