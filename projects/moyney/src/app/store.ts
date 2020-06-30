import { ChangeDetectorRef, Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { State } from './state';

const state = new State();

@Injectable()
export abstract class Store<T> implements OnDestroy {
  private _state = {};
  private _destroy$ = new Subject();

  constructor(private cdf: ChangeDetectorRef) {
    state.state$.pipe(takeUntil(this._destroy$)).subscribe(v => {
      this._state = v;
      this.cdf.markForCheck();
    });
  }

  get state(): Partial<T> {
    return this._state;
  }

  set state(n: Partial<T>) {
    state.state = n;
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
