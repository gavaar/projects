import { Injectable } from '@angular/core';
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, UserCredential } from "firebase/auth";
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private _userChange$ = new BehaviorSubject(null);
  userChanges = this._userChange$.asObservable();

  constructor() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this._userChange$.next({
          uid: user.uid,
          name: user.displayName,
        });
      } else {
        this._userChange$.next({ uid: null, name: '' });
      }
    });
  }

  onLogin(): void {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  }

  onLogout(): void {
    const auth = getAuth();
    auth.signOut();
  }
}
