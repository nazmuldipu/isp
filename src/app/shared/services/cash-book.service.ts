import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Cashbook } from 'shared/models/cashbook.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { OrderByDirection } from '@firebase/firestore-types';

@Injectable()
export class CashBookService {
  serviceUrl = 'cashbook'
  private _cashbookSource = new BehaviorSubject<Cashbook[]>([]);
  cashbooks$ = this._cashbookSource.asObservable();
  cashbooks: Cashbook[] = [];
  companyId;
  userId;
  
  constructor(
    private afs: AngularFirestore,
  ) { 
    this.companyId = localStorage.getItem('companyId');
    this.userId = localStorage.getItem('userId');
    if(this.companyId)
      this.getAll(this.companyId);
  }

  create(cashbook: Cashbook) {
    delete cashbook["id"];
    cashbook.createdDate = new Date();
    cashbook.createdBy = this.userId;
    return this.afs.collection(this.serviceUrl).add({
      ...cashbook
    });
  }

  getAll(companyId) {
    return this.afs.collection(this.serviceUrl, ref => ref.where('companyId', '==', companyId).orderBy('date')).snapshotChanges()
    .subscribe(data => {
      this.cashbooks = [];
      data.forEach(resp => {
        let cas = resp.payload.doc.data() as Cashbook;
        cas.id = resp.payload.doc.id;
        this.cashbooks.push(cas);
      });
      this._cashbookSource.next(this.cashbooks);
    })
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

  getPaginatedStartAfter(companyId, orderBy, order: OrderByDirection = 'asc', limit, startAfter) {
    return this.afs.collection(this.serviceUrl, ref => ref.where('companyId', '==', companyId).orderBy(orderBy, order).limit(limit).startAfter(startAfter)).snapshotChanges();
  }
  
  getPaginatedEndBefore(companyId, orderBy, limit, endBefore, order: OrderByDirection = 'asc') {
    return this.afs.collection(this.serviceUrl, ref => ref.where('companyId', '==', companyId).orderBy(orderBy, order).limit(limit).endBefore(endBefore)).snapshotChanges();
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
