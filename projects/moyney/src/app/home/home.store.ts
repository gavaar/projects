import { Injectable } from '@angular/core';
import { Store } from '../store';

interface HomeState {}

@Injectable()
export class HomeStore extends Store<HomeState> {}
