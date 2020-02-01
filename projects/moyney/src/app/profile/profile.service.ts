import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { from } from 'rxjs';

@Injectable()
export class ProfileService {
  constructor(private afAuth: AngularFireAuth) {}

  logout() {
    return from(this.afAuth.auth.signOut());
  }
}
