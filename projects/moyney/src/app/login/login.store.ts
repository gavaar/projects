import { Injectable } from '@angular/core';
import { Store } from '../store';

interface LoginState {
  token: string;
  user: { uid: string; displayName: string; photoURL: string };
}

@Injectable()
export class LoginStore extends Store<LoginState> {}
