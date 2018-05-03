import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Customer } from 'shared/models/customer.model';

@Injectable()
export class CustomerService {
  serviceUrl = 'customer';
  private _customersSource = new BehaviorSubject<Customer[]>([]);
  customers$ = this._customersSource.asObservable();
  customers: Customer[] = [];
  companyId;
  userId;
  numberOfCustomers: number;

  constructor(
    private afs: AngularFirestore,
  ) {
    this.companyId = localStorage.getItem('companyId');
    this.userId = localStorage.getItem('userId');
    if (this.companyId)
      this.getAll(this.companyId);
  }

  create(customer: Customer) {
    delete customer["id"];
    customer.createdDate = new Date();
    customer.createdBy = this.userId;
    return this.afs.collection(this.serviceUrl).add({
      ...customer
    });
  }

  getAll(companyId) {
    this.afs.collection(this.serviceUrl, ref => ref.where('companyId', '==', companyId)).snapshotChanges()
      .subscribe(data => {
        console.log('Customer loaded : ' + data.length);
        this.numberOfCustomers = data.length;
        this.customers = [];
        data.forEach(resp => {
          let cus = resp.payload.doc.data() as Customer;
          cus.id = resp.payload.doc.id;
          this.customers.push(cus);
        });
        this._customersSource.next(this.customers);
      })
  }

  getActiveCustomers() {
    return this.afs.collection(this.serviceUrl, ref => ref.where('active', '==', true)).snapshotChanges();
  }

  getInactiveCustomers() {
    return this.afs.collection(this.serviceUrl, ref => ref.where('active', '==', false)).snapshotChanges();
  }

  getCompanyCustomer(companyId) {
    return this.afs.collection(this.serviceUrl, ref => ref.where('companyId', '==', companyId)).snapshotChanges();
  }

  getActiveCompanyCustomer(companyId) {
    return this.afs.collection(this.serviceUrl, ref => ref.where('companyId', '==', companyId).where('active', '==', true)).snapshotChanges();
  }

  getInactiveCompanyCustomer(companyId) {
    return this.afs.collection(this.serviceUrl, ref => ref.where('companyId', '==', companyId).where('active', '==', false)).snapshotChanges();
  }

  get(cid) {
    return this.afs.doc(this.serviceUrl + '/' + cid).valueChanges();
  }

  searchCustomer(start, end, companyId) {
    return this.afs.collection(this.serviceUrl, ref => ref.orderBy('name').startAt(start).endAt(end)).snapshotChanges();
  }

  update(cid, customer: Customer) {
    delete customer["id"]
    return this.afs.doc(this.serviceUrl + '/' + cid).update({
      ...customer
    });
  }

  delete(cid) {
    return this.afs.doc(this.serviceUrl + '/' + cid).delete();
  }

}
