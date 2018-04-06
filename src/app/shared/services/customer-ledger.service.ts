import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { CustomerLedger } from 'shared/models/customer-ledger.model';

@Injectable()
export class CustomerLedgerService {
  serviceUrl = 'customerLedger'
  constructor(
    private afs: AngularFirestore,
  ) { }

  create(customerLedger: CustomerLedger) {
    delete customerLedger["id"]
    return this.afs.collection(this.serviceUrl).add({
      ...customerLedger
    });
  }

  getAll() {
    return this.afs.collection(this.serviceUrl).snapshotChanges();
  }

  getByCustomerId(customerId) {
    return this.afs.collection(this.serviceUrl, ref => ref.where('customerId', '==', customerId).orderBy('date')).snapshotChanges();
  }

  getCustomerLastLedger(customerId){
    return this.afs.collection(this.serviceUrl, ref =>ref.where('customerId', '==', customerId).orderBy('date', 'desc').limit(1)).valueChanges();
  }

  get(cid) {
    return this.afs.doc(this.serviceUrl + '/' + cid).valueChanges();
  }

  update(cid, customerLedger: CustomerLedger) {
    delete customerLedger["id"]
    return this.afs.doc(this.serviceUrl + '/' + cid).update({
      ...customerLedger
    });
  }

  delete(cid) {
    return this.afs.doc(this.serviceUrl + '/' + cid).delete();
  }

}
