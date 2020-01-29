import { Inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Inject({})
export class TransactionAddService {
  constructor(private afs: AngularFirestore) {}

  getTransactions() {
    this.afs
      .collection('/invoices')
      .snapshotChanges()
      .subscribe(snapshots => console.log({ snapshots }));
  }
}
