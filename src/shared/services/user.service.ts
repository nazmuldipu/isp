import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

import { User } from '../models/user.model';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class UserService {
  constructor(private afs: AngularFirestore) {}

  create(user) {
    return this.afs.collection('users').add(user);
  }

  saveRegisteredUser(uid, name, email) {
    return this.afs
      .collection('users')
      .doc(uid)
      .set({
        name: name,
        email: email,
        roles: 'USER'
      });
  }

  getAll() {
    return this.afs
      .collection('users')
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as User;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
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
