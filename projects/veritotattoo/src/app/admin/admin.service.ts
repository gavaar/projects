import { Injectable } from '@angular/core';
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { BehaviorSubject, from } from 'rxjs';
import { firestore } from '@firebase';
import { doc, getDoc } from "firebase/firestore";

interface User {
  admin: boolean;
  uid: string;
  name: string;
}

@Injectable({ providedIn: 'root' })
export class AdminService {
  private _userChange$ = new BehaviorSubject<User | null>(null);
  userChanges = this._userChange$.asObservable();

  constructor() {
    onAuthStateChanged(getAuth(), (user) => {
      this.handleUserState(user);
    });
  }

  onLogin(): void {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  }

  onLogout(): void {
    const auth = getAuth();
    if (confirm('You sure?')) {
      auth.signOut();
    }
  }

  private handleUserState(user) {
    if (user) {
      this.getUserInfo(user.uid).subscribe(userSnap => {
        const { admin } = userSnap.data() || {};
        const newUserData = { admin, uid: user.uid, name: user.displayName };

        this._userChange$.next(newUserData);
      });
    } else {
      this._userChange$.next({ uid: null, name: '', admin: false });
    }
  }

  private getUserInfo(id: string) {
    const userRef = doc(firestore, 'users', id);
    return from(getDoc(userRef));
  }
}
