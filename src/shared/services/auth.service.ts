import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { Observable, of } from 'rxjs';
import { User } from 'shared/models/user.model';
import { UserService } from 'shared/services/user.service';
import { mergeMap, switchMap } from 'rxjs/operators';

@Injectable()
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(
    private afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private userService: UserService
  ) {
    this.user$ = afAuth.authState;
  }

  get appUser$(): Observable<User> {
    return this.user$.pipe(
      switchMap(user => {
        if (user) return this.userService.get(user.uid);

        return of(null);
      })
    );
  }

  getUser$() {
    return this.user$;
  }

  register(email, password) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  loginWithEmail(email, password) {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  resetPassword(email: string) {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  sendVerificationEmail() {
    return this.afAuth.auth.currentUser.sendEmailVerification();
  }

  // this.afs.collection('posts').add({'title': this.title, 'content': this.content});
  // this.afs.collection('posts').doc('my-custom-id').set({'title': this.title, 'content': this.content});
  saveUserInfoFromForm(uid, name, email) {
    return this.afs
      .collection('users')
      .doc(uid)
      .set({
        name: name,
        email: email,
        roles: 'USER'
      });
  }

  getUser(uid: string) {
    return this.afs.doc('users/' + uid).valueChanges();
  }

  logout() {
    this.afAuth.auth
      .signOut()
      .then(data => {
        localStorage.clear();
        console.log('SIGNOUT');
      })
      .catch(error => {
        console.log('SIGNOUT ERROR', error);
      });
  }
}
