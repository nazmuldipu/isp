import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Company } from 'shared/models/company.model';

@Injectable()
export class CompanyService {

  constructor(
    private afs: AngularFirestore,
  ) {
  }

  create(company: Company) {
    delete company["id"]
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
