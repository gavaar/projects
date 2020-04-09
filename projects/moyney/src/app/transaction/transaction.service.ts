import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  CollectionReference,
} from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { from, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Auth } from '../auth';
import { CollectionIncome, Income } from './transaction.models';

class IncomeRefs {
  income: AngularFirestoreCollection<CollectionIncome>;
  income_ordered: AngularFirestoreCollection<CollectionIncome>;
  description: AngularFirestoreCollection<CollectionIncome>;
  tag: AngularFirestoreCollection<CollectionIncome>;
  date: (from?: Date) => AngularFirestoreDocument<CollectionIncome>;
}

const orderByDate = (i: CollectionReference) => i.orderBy('date_added', 'desc');

@Injectable()
export class TransactionService {
  private uid = this.auth.uid;
  private refs: IncomeRefs = {
    income_ordered: this.db.collection(`incomes/${this.uid}/income`, orderByDate),
    income: this.db.collection(`incomes/${this.uid}/income`),
    description: this.db.collection(`incomes/${this.uid}/description`),
    tag: this.db.collection(`incomes/${this.uid}/tag`),
    date: (from?: Date) => {
      const _date = from || new Date();
      return this.db.doc(`incomes/${this.uid}/yearly/${_date.getFullYear()}/monthly/${_date.getMonth()}`);
    },
  };

  constructor(private auth: Auth, private db: AngularFirestore) {}

  get(): Observable<Income[]> {
    return this.refs.income_ordered.valueChanges({ idField: 'id' }).pipe(
      take(1),
      map(incomes => incomes.map(i => new Income(i))),
    );
  }

  create(income: Income): Observable<Income> {
    const { amount, description, tags: _tags } = income;
    const tags = _tags.split(',').map(t => t.trim());
    const batch = this.db.firestore.batch();
    const incomeRef = this.refs.income.ref.doc();
    const descriptionRef = this.refs.description.doc(description).ref;
    const dateRef = this.refs.date().ref;

    const newIncome = {
      amount,
      description,
      currency: 'euro',
      date_added: new Date(),
      tags: tags.reduce((tagMap, _tag) => {
        tagMap[_tag] = true;
        return tagMap;
      }, {}),
    };

    batch.set(incomeRef, newIncome, { merge: true });
    batch.set(descriptionRef, { [incomeRef.id]: true }, { merge: true });
    batch.set(dateRef, { [incomeRef.id]: true }, { merge: true });
    tags.map(_tag => batch.set(this.refs.tag.doc(_tag).ref, { [incomeRef.id]: true }, { merge: true }));

    return from(batch.commit()).pipe(
      map(
        () =>
          new Income({
            ...newIncome,
            id: incomeRef.id,
            date_added: {
              seconds: newIncome.date_added.getTime() / 1000,
              nanoseconds: newIncome.date_added.getTime() * 1000000,
            },
          }),
      ),
    );
  }

  patch = (income: Income & { __prevState__: Income }): Observable<Income> => {
    const { id, description, date, amount, tags } = income;
    const batch = this.db.firestore.batch();
    const updates = <Partial<Income>>{ id };
    const incomeRef = this.refs.income.ref.doc(id);

    if (description) {
      updates.description = description;
      const _prevDescription = income.__prevState__.description;
      const _prevDescriptionRef = this.refs.description.doc(_prevDescription).ref;
      const _newDescriptionREf = this.refs.description.doc(description).ref;
      batch.update(_prevDescriptionRef, { [id]: firebase.firestore.FieldValue.delete() });
      batch.set(_newDescriptionREf, { [id]: true }, { merge: true });
    }
    if (amount) {
      updates.amount = amount;
    }
    if (date || tags) {
      alert('this feature is not enabled yet, sorry');
    }
    batch.set(incomeRef, updates, { merge: true });

    return from(batch.commit()).pipe(map(_ => ({ ...income.__prevState__, ...updates })));
  };

  delete(income: Income): Observable<void> {
    const { id, description, originalDate, tags: _tags } = income;
    const tags = _tags.split(',').map(t => t.trim());
    const batch = this.db.firestore.batch();
    const incomeRef = this.refs.income.doc(id).ref;
    const descriptionRef = this.refs.description.doc(description).ref;
    const dateRef = this.refs.date(originalDate).ref;

    batch.update(descriptionRef, { [id]: firebase.firestore.FieldValue.delete() });
    batch.update(dateRef, { [id]: firebase.firestore.FieldValue.delete() });
    tags.map(_tag => batch.update(this.refs.tag.doc(_tag).ref, { [id]: firebase.firestore.FieldValue.delete() }));
    batch.delete(incomeRef);

    return from(batch.commit());
  }
}
