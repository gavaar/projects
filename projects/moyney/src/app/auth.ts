import { Injectable } from '@angular/core';
import { Store } from './store';

interface AuthInterface {
  user: { uid: string };
}

@Injectable()
export class Auth extends Store<AuthInterface> {
  get uid(): string {
    return this.state.user.uid;
  }
}
