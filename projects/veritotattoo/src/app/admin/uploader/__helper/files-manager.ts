import { ImageData } from '@vero-components/image-storage';
import { BehaviorSubject } from 'rxjs';

export class FilesManager {
  private _fileMap = new Map<number, Pick<ImageData, 'available' | 'description' | 'folder'>>();
  private _file$ = new BehaviorSubject<ImageData[]>([]);

  get files(): ImageData[] {
    return this._file$.value;
  }
  set files(id: ImageData[]) {
    this.setOriginalFileData(id);
    this._file$.next(id);
  }

  file$ = this._file$.asObservable();

  loading = false;

  clear(): void {
    this._file$.next([]);
  }

  remove(ids: number[]): void {
    const remaining = this.files.filter(({ id }) => {
      const isRemaining = !ids.includes(id);
      if (!isRemaining) {
        this._fileMap.delete(id);
      }
      return isRemaining;
    });
    this._file$.next(remaining);
  }

  some(ids: number[]): ImageData[] {
    const files = this.files.filter(f => ids.includes(f.id));
    return files;
  }

  rawFiles(ids?: number[]): File[] {
    return this._file$.value
      .filter(file => !ids || ids.includes(file.id))
      .map(id => {
        id.file['__folder'] = id.folder;
        id.file['__firebaseId'] = id.id;
        return id.file;
      });
  }

  changedFiles(): ImageData[] {
    const remainingFiles = this.files;
    return remainingFiles.map(imgData => {
      const { id, available, description, folder } = imgData;
      const { available: _a, description: _d, folder: _f } = this._fileMap.get(id);

      const changes = { id } as ImageData;
      if (available !== _a) changes.available = available;
      if (description !== _d) changes.description = description;
      if (folder !== _f) changes.folder = folder;

      return changes;
    }).filter(obj => Object.keys(obj).find(k => k !== 'id'));
  }

  deletedFiles(): number[] {
    const remainingFiles = this.files.map(f => f.id);
    const deleted = [...this._fileMap.keys()].filter(f => !remainingFiles.includes(f));
    return deleted;
  }

  private setOriginalFileData(files: ImageData[]): void {
    files.forEach(imgData => {
      if (!this._fileMap.has(imgData.id)) {
        const { id, available, description, folder } = imgData;
        this._fileMap.set(id, ({ available, description, folder }));
      }
    });
  }
}
