import { ImageData } from '@vero-components/image-storage';
import { BehaviorSubject } from 'rxjs';

export enum DisplayView {
  New = 'newImages',
  Old = 'oldImages',
}

export class FilesManager {
  private _newFile$ = new BehaviorSubject<ImageData[]>([]);

  get newFiles(): ImageData[] {
    return this._newFile$.value;
  }
  set newFiles(id: ImageData[]) {
    this._newFile$.next(id);
  }

  newFile$ = this._newFile$.asObservable();

  loading = false;
  displayView: DisplayView = DisplayView.Old;

  clear(): void {
    this._newFile$.next([]);
  }

  rawFiles(): File[] {
    return this._newFile$.value.map(id => {
      id.file['__folder'] = id.folder;
      return id.file;
    });
  }

  selectDisplay(view: DisplayView) {
    this.displayView = view;
  }
}
