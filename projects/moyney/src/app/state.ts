import { BehaviorSubject } from 'rxjs';

export class State {
  private _state$ = new BehaviorSubject({});

  get state() {
    return this._state$.getValue();
  }

  set state(newState) {
    this._state$.next({ ...this.state, ...newState });
  }

  get state$() {
    return this._state$.asObservable();
  }
}
