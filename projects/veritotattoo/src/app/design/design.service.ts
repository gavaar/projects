import { Injectable } from '@angular/core';
import { ImageStorageService } from '@vero-components/image-storage';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class DesignService {
  private _loadedPages = {};
  private _images = new BehaviorSubject<string[]>([]);

  constructor(private imageStorageService: ImageStorageService) {}

  loadMore(page = 0): Observable<string[]> {
    if (!this._loadedPages[page]) {
      this.imageStorageService.list('design', page).subscribe(images => {
        const currentImages = this._images.value;
        currentImages.push(...images.map(i => i.imageUrl as string));
        this._images.next(currentImages);
      });
    }

    return this._images.asObservable();
  }
}
