import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Invoice } from 'shared/models/invoice.model';
import { OrderByDirection } from '@firebase/firestore-types';

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

  getPaginatedStartAfter(companyId, orderBy, order: OrderByDirection = 'asc', limit, startAfter) {
    return this.afs.collection(this.serviceUrl, ref => ref.where('companyId', '==', companyId).orderBy(orderBy, order).limit(limit).startAfter(startAfter)).snapshotChanges();
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
