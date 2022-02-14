import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ICON_LIST } from './moy-select-icon.icons';

@Injectable()
export class MoySelectIconService {
  private cache = new Map<string, string[]>();
  private _options = new BehaviorSubject<string[]>([]);
  options = this._options.asObservable();

  searchFor(value = ''): void {
    if (!this.cache.has(value)) {
      const some = ICON_LIST.filter(v => v.includes(value)).slice(0, 50);
      this.cache.set(value, some);
    }

    this._options.next(this.cache.get(value));
  }
}
