import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Customer } from 'shared/models/customer.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { OrderByDirection } from '@firebase/firestore-types';

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
        ref
          .where('companyId', '==', companyId)
          .where('active', '==', true)
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

  getInactiveCustomers(companyId) {
    return this.afs
      .collection(this.serviceUrl, ref =>
        ref
          .where('companyId', '==', companyId)
          .where('active', '==', false)
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

  getPaginatedStartAfter(
    companyId,
    order: OrderByDirection = 'asc',
    limit,
    startAfter
  ) {
    return this.afs
      .collection(this.serviceUrl, ref =>
        ref
          .where('companyId', '==', companyId)
          .orderBy('updatedAt', order)
          .limit(limit)
          .startAfter(startAfter)
      )
      .snapshotChanges()
      .pipe(
        // take(1),
        map(actions => {
          if (order === 'desc') {
            actions.reverse();
          }
          return actions.map(a => {
            const data = a.payload.doc.data() as Customer;
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
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

  searchByZone(zone: string) {
    return this.afs
      .collection(this.serviceUrl, ref =>
        ref
          .where('companyId', '==', this.companyId)
          .where('zone', '==', zone)
          .orderBy('updatedAt')
      )
      .snapshotChanges();
  }

  update(cid, customer: Customer) {
    delete customer['id'];
    return this.afs.doc(this.serviceUrl + '/' + cid).update({
      ...customer,
      updatedAt: new Date()
    });
  }

  // delete(cid) {
  //   console.log('deleting', this.serviceUrl, cid);
  //   // return this.afs.doc(this.serviceUrl + '/' + cid).delete();
  //   // return this.afs.doc(this.serviceUrl + '/' + cid).delete();
  //   return this.afs
  //     .collection(this.serviceUrl)
  //     .doc(cid)
  //     .delete();
  // }

  delete(cid) {
    return this.afs.doc(this.serviceUrl + '/' + cid).delete();
  }
}
