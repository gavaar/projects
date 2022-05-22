import { Injectable } from '@angular/core';
import { ImageStorageService } from '@vero-components/image-storage';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class DesignService {
  private _myImages = {};
  private _loadedPages = {};
  private _images = new BehaviorSubject<string[]>([]);

  constructor(private imageStorageService: ImageStorageService) { }

  listChanges(): Observable<string[]> {
    return this._images.asObservable();
  }

  loadMore(page = 0): void {
    if (!this._loadedPages[page]) {
      this.imageStorageService.list('design', page).subscribe(images => {
        this._loadedPages[page] = true;
        images.forEach(i => this._myImages[i.id] = i.imageUrl);

        this.updateList();
      });
    } else {
      this.updateList();
    }
  }

  private updateList(): void {
    this._images.next(Object.values(this._myImages));
  }
}
