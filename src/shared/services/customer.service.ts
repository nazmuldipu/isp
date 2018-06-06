import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Customer } from 'shared/models/customer.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class CustomerService {
  serviceUrl = 'customer';
  companyId = localStorage.getItem('companyId');
  userId = localStorage.getItem('userId');
  numberOfCustomers: number;

  constructor(private afs: AngularFirestore) {}

  create(customer: Customer) {
    delete customer['id'];
    customer.createdDate = new Date();
    customer.createdBy = this.userId;
    return this.afs.collection(this.serviceUrl).add({
      ...customer
    });
  }

  get(customerId) {
    return this.afs.doc(this.serviceUrl + `/${customerId}`).valueChanges();
  }

  getAll(companyId) {
    return this.afs
      .collection<Customer>(this.serviceUrl, ref =>
        ref
          .where('companyId', '==', this.companyId)
          .orderBy('userName')
          .orderBy('createdDate')
      )
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as Customer;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  getActiveCustomers(companyId) {
    return this.afs
      .collection(this.serviceUrl, ref =>
        ref.where('companyId', '==', companyId).where('active', '==', true)
      )
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as Customer;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  getInactiveCustomers(companyId) {
    return this.afs
      .collection(this.serviceUrl, ref =>
        ref.where('companyId', '==', companyId).where('active', '==', false)
      )
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as Customer;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  searchCustomer(start, end, companyId) {
    return this.afs
      .collection(this.serviceUrl, ref =>
        ref
          .where('companyId', '==', companyId)
          .orderBy('name')
          .startAt(start)
          .endAt(end)
      )
      .snapshotChanges();
  }

  update(cid, customer: Customer) {
    delete customer['id'];
    return this.afs.doc(this.serviceUrl + '/' + cid).update({
      ...customer
    });
  }

  delete(cid) {
    return this.afs.doc(this.serviceUrl + '/' + cid).delete();
  }
}
