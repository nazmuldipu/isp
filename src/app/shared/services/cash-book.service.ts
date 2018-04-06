import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Cashbook } from 'shared/models/cashbook.model';

@Injectable()
export class CashBookService {
  serviceUrl = 'cashbook'

  constructor(
    private afs: AngularFirestore,
  ) { }

  create(cashbook: Cashbook) {
    delete cashbook["id"]
    return this.afs.collection(this.serviceUrl).add({
      ...cashbook
    });
  }

  getAll() {
    return this.afs.collection(this.serviceUrl).snapshotChanges();
  }

  get(cid) {
    return this.afs.doc(this.serviceUrl + '/' + cid).valueChanges();
  }

  getByCompnayId(companyId) {
    return this.afs.collection(this.serviceUrl, ref => ref.where('companyId', '==', companyId).orderBy('date')).snapshotChanges();
  }

  getCompanyLastCashbook(companyId) {
    return this.afs.collection(this.serviceUrl, ref => ref.where('companyId', '==', companyId).orderBy('date', 'desc').limit(1)).valueChanges();
  }

  update(cid, cashbook : Cashbook) {
    delete cashbook["id"]
    return this.afs.doc(this.serviceUrl + '/' + cid).update({
      ...cashbook
    });
  }

  delete(cid) {
    return this.afs.doc(this.serviceUrl + '/' + cid).delete();
  }

}
