import { BehaviorSubject, Observable } from 'rxjs';

export class State {
  private _state$ = new BehaviorSubject<any>({});

  constructor() {}

  get state() {
    return this._state$.getValue();
  }

  set state(newState) {
    this._state$.next({ ...this.state, ...newState });
  }

  get state$(): Observable<any> {
    return this._state$.asObservable();
  }
}
