import { Inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Inject({})
export class TransactionAddService {
  constructor(private afs: AngularFirestore) {}

  getTransactions() {
    this.afs
      .doc('movements/FTewAdozWNPcWuuQTa9kezfzMBG2')
      .get()
      .subscribe(_ => console.log(_));

    this.submitTransaction();
  }

  submitTransaction() {
    this.afs
      .doc('movements/FTewAdozWNPcWuuQTa9kezfzMBG2')
      .collection('invoices')
      .add({
        amount: 10,
        date_added: new Date(),
        description: 'testing it',
        tags: { test_tag_1: true, test_tag_2: true },
      })
      .then(invoice => {
        this.afs
          .doc('users/FTewAdozWNPcWuuQTa9kezfzMBG2')
          .get()
          .subscribe(user => {
            const invoices = user.data().invoices;

            invoices[invoice.id] = true;

            this.afs.doc('users/FTewAdozWNPcWuuQTa9kezfzMBG2').update({ invoices });
          });
      });
  }
}
