import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Invoice } from 'shared/models/invoice.model';
import { OrderByDirection } from '@firebase/firestore-types';

@Injectable()
export class InvoiceService {
  serviceUrl = 'invoices';
  companyId;
  userId;

  constructor(private afs: AngularFirestore) {
    this.companyId = localStorage.getItem('companyId');
    this.userId = localStorage.getItem('userId');
  }

  create(invoice: Invoice) {
    delete invoice['id'];
    invoice.createdDate = new Date();
    invoice.createdBy = this.userId;
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

  getPaginatedStartAfter(
    companyId,
    orderBy,
    order: OrderByDirection = 'asc',
    limit,
    startAfter
  ) {
    return this.afs
      .collection(this.serviceUrl, ref =>
        ref
          .where('companyId', '==', companyId)
          .orderBy(orderBy, order)
          .limit(limit)
          .startAfter(startAfter)
      )
      .snapshotChanges();
  }

  update(iid, invoice: Invoice) {
    delete invoice['id'];
    return this.afs.doc(this.serviceUrl + '/' + iid).update({
      ...invoice
    });
  }

  delete(iid) {
    return this.afs.doc(this.serviceUrl + '/' + iid).delete();
  }
}
