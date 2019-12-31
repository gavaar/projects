import { Injectable } from '@angular/core';
import { Store } from '../store';

interface HomeState {
  token: string;
  homeTest: string;
}

@Injectable()
export class HomeStore extends Store<HomeState> {}
