import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Invoice } from 'shared/models/invoice.model';

@Injectable()
export class InvoiceService {
  serviceUrl = 'invoices'

  constructor(
    private afs: AngularFirestore,
  ) { }

  create(invoice: Invoice) {
    delete invoice["id"]
    return this.afs.collection(this.serviceUrl).add({
      ...invoice
    });
  }

  getAll() {
    return this.afs.collection(this.serviceUrl).snapshotChanges();
  }

  get(iid) {
    return this.afs.doc(this.serviceUrl + '/' + iid).valueChanges();
  }

  update(iid, invoice: Invoice) {
    delete invoice["id"]
    return this.afs.doc(this.serviceUrl + '/' + iid).update({
      ...invoice
    });
  }

  delete(iid) {
    return this.afs.doc(this.serviceUrl + '/' + iid).delete();
  }

}