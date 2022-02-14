import { Injectable } from '@angular/core';

@Injectable()
export class MoyImagePreviewCacheService {
  private _cache = new Map<string, string>();

  get(originalSrc: string, previewHeight: number): string {
    return this._cache.get(this.buildKey(originalSrc, previewHeight));
  }

  set(originalSrc: string, previewHeight: number, tinySrcValue: string): void {
    this._cache.set(this.buildKey(originalSrc, previewHeight), tinySrcValue);
  }

  private buildKey(originalSrc: string, previewHeight: number): string {
    return `${previewHeight}::${originalSrc}`;
  }
}
