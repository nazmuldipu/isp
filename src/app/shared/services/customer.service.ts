import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Customer } from 'shared/models/customer.model';

@Injectable()
export class CustomerService {

  constructor(
    private afs: AngularFirestore,
  ) { }

  create(customer: Customer) {
    delete customer["id"]
    return this.afs.collection('customer').add({
      ...customer
    });
  }

  getAll() {
    return this.afs.collection('customer').snapshotChanges();
  }

  getActiveCustomers(){
    return this.afs.collection('customer', ref => ref.where('active', '==', true)).snapshotChanges();
  }
  
  getInactiveCustomers(){
    return this.afs.collection('customer', ref => ref.where('active', '==', false)).snapshotChanges();
  }

  get(cid) {
    return this.afs.doc('customer/' + cid).valueChanges();
  }

  update(cid, customer: Customer) {
    delete customer["id"]
    return this.afs.doc('customer/' + cid).update({
      ...customer
    });
  }

  delete(cid) {
    return this.afs.doc('customer/' + cid).delete();
  }

}
