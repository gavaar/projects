import { ChangeDetectorRef, Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { State } from './state';

const state = new State();

@Injectable()
export abstract class Store<T> implements OnDestroy {
  private _state = {};
  protected _destroy$ = new Subject();

  constructor(private cdf: ChangeDetectorRef) {
    state.state$.pipe(takeUntil(this._destroy$)).subscribe(v => {
      this._state = v;
      this.cdf.markForCheck();
    });

    this.onInit();
  }

  get state(): Partial<T> {
    return this._state;
  }
  set state(n: Partial<T>) {
    state.state = n;
  }

  get stateChanges() {
    return state.state$ as Observable<T>;
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  onInit() {}
}
