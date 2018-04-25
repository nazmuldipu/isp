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

  getPaginatedForward(companyId, orderBy, limit, startAfter) {
    return this.afs.collection(this.serviceUrl, ref => ref.where('companyId', '==', companyId).orderBy(orderBy, 'desc').limit(limit).startAfter(startAfter)).snapshotChanges();
  }
  
  getPaginatedReverse(companyId, orderBy, limit, endBefore) {
    return this.afs.collection(this.serviceUrl, ref => ref.where('companyId', '==', companyId).orderBy(orderBy, 'desc').limit(limit).endBefore(endBefore)).snapshotChanges();
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
