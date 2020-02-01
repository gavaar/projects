import { Injectable } from '@angular/core';
import { Store } from '../store';

interface ProfileState {
  user: { uid: string; displayName: string; photoURL: string };
}

@Injectable()
export class ProfileStore extends Store<ProfileState> {}
