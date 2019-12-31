import { Injectable } from '@angular/core';
import { Store } from '../store';

interface LoginState {
  token: string;
}

@Injectable()
export class LoginStore extends Store<LoginState> {}
