import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { User } from '../models/user.model';
// import * as admin from 'firebase-admin';

// var serviceAccount = require('shared/jsons/firebase-admin-model.json');

@Injectable()
export class UserService {

  constructor(
    private afs: AngularFirestore,
  ) {
    // admin.initializeApp({
    //   credential: admin.credential.cert(serviceAccount),
    //   databaseURL: 'https://isp-moninfotech.firebaseio.com'
    // });
  }

  // adminGetUser(uid) {
  //   admin.auth().getUser(uid)
  //     .then(function (userRecord) {
  //       // See the UserRecord reference doc for the contents of userRecord.
  //       console.log("Successfully fetched user data:", userRecord.toJSON());
  //     })
  //     .catch(function (error) {
  //       console.log("Error fetching user data:", error);
  //     });
  // }

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
    return this.afs.doc('users/' + uid).update(user);
  }

  delete(uid) {
    return this.afs.doc('users/' + uid).delete();
  }

}
