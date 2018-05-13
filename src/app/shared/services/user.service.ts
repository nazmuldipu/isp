import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Store } from 'store';

import { User } from '../models/user.model';

@Injectable()
export class UserService {

  users$: Observable<any> = this.afs.collection<User>('users').snapshotChanges()
    .map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as User;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    })
    .do(next => this.store.set('users', next));

  constructor(
    private store: Store,
    private afs: AngularFirestore,
  ) {
  }

  create(user) {
    return this.afs.collection('users').add(user);
  }

  saveRegisteredUser(uid, name, email) {
    return this.afs.collection('users').doc(uid).set({
      name: name,
      email: email,
      roles: 'USER'
    });
  }

  getAll() {
    return this.afs.collection('users').snapshotChanges();
  }

  get(uid) {
    return this.afs.doc('users/' + uid).valueChanges();
  }

  update(uid, user: User) {
    return this.afs.doc('users/' + uid).update({
      ...user
    });
  }

  delete(uid) {
    return this.afs.doc('users/' + uid).delete();
  }

}
