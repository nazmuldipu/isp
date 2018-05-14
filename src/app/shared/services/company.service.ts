import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Company } from 'shared/models/company.model';
import { Observable } from 'rxjs/Observable';
import { Store } from 'store';

@Injectable()
export class CompanyService {
  
  company$: Observable<any> = this.afs.collection<Company>('company').snapshotChanges()
    .map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Company;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    })
    .do(next => this.store.set('company', next));

  userId;
  constructor(
    private store: Store,
    private afs: AngularFirestore,
  ) {
    this.userId = localStorage.getItem('userId');
  }

  create(company: Company) {
    delete company["id"];
    company.createdDate = new Date();
    company.createdBy = this.userId;
    return this.afs.collection('company').add({
      ...company
    });
  }

  getAll() {
    return this.afs.collection('company').snapshotChanges();
  }

  get(cid) {
    return this.afs.doc('company/' + cid).valueChanges();
  }

  update(cid, company: Company) {
    delete company["id"]
    delete company["balance"]
    return this.afs.doc('company/' + cid).update({
      ...company
    });
  }

  delete(cid) {
    return this.afs.doc('company/' + cid).delete();
  }

}
