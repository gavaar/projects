import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { from, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthType, PendingAuth } from './login.models';

@Injectable()
export class LoginService {
  private _pending: PendingAuth;

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) {}

  auth(type: AuthType): Observable<firebase.auth.UserCredential> {
    const provider = providerBuilder(type);

    return from(this.afAuth.auth.signInWithPopup(provider)).pipe(
      tap(
        user => {
          if (this._pending) linkUser(user, this._pending.credential).subscribe();

          const dbUserRef = this.db.doc(`users/${user.user.uid}`);

          dbUserRef.get().subscribe(userSnapShot => {
            if (!userSnapShot.exists) {
              dbUserRef.set({
                invoices: {},
                joined: new Date(),
                name: user.user.displayName,
                picture: user.user.photoURL,
                tags: {},
              });
            }
          });
        },
        error => (this._pending = handleLoginError(error)),
      ),
    );
  }
}

function providerBuilder(type: AuthType) {
  switch (type) {
    case AuthType.Fb:
      return new firebase.auth.FacebookAuthProvider();
    case AuthType.Google:
      return new firebase.auth.GoogleAuthProvider();
  }
}

function linkUser(user: firebase.auth.UserCredential, credential: firebase.auth.AuthCredential) {
  return from(user.user.linkWithCredential(credential));
}

function handleLoginError(error: firebase.auth.AuthError): PendingAuth {
  if (error.code === 'auth/account-exists-with-different-credential') {
    const { credential, message } = error;
    const newType = credential.providerId === 'facebook.com' ? AuthType.Google : AuthType.Fb;

    return {
      newType,
      credential,
      message,
    };
  }
}
