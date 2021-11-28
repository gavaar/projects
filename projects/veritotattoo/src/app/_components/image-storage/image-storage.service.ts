import { Injectable, OnDestroy } from '@angular/core';
import { fireStorage } from '@firebase';
import { ref, uploadBytesResumable, deleteObject, UploadTask, list, getDownloadURL, StorageReference } from "firebase/storage";
import { BehaviorSubject, Observable, from, combineLatest, of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import { imgRegex, ImgType } from '.';
import { FileQueueHandler } from './__models/file-queue.handler';
import { ImageData } from './__models/image-data';
import { PageMemory } from './__models/page-memory';

const CONFIG = {
  maxResultsPerPage: 50,
}

function getNewNameForFile(file: File): { id: number; extension: string } {
  const fileSplit = file.name.split('.');
  const extension = fileSplit[fileSplit.length - 1];
  return { id: new Date().getTime(), extension };
}

type PickedImage = Pick<ImageData, 'id' | 'file' | 'imageUrl'>;

export interface UploadState {
  uploaded: number;
  queue: File[];
  currentProgressPercentage: number;
  uploadedId?: number;
};

@Injectable()
export class ImageStorageService implements OnDestroy {
  private _pageMemory = new PageMemory<PickedImage[]>();
  private _pageTokenMap: { [folder in keyof ImgType]?: { [page: number]: string } } = {};
  private fileQueue = new FileQueueHandler();
  private currentUpload: UploadTask;
  private _uploadState = new BehaviorSubject<UploadState>({ uploaded: 0, queue: [], currentProgressPercentage: 0 });

  get uploadState(): Observable<UploadState> {
    return this._uploadState.asObservable();
  }

  ngOnDestroy() {
    this._uploadState.complete();
  }

  getList(folder: ImgType, page = 0): Observable<PickedImage[]> {
    if (this._pageMemory.get(page)) {
      return of(this._pageMemory.get(page));
    }

    if (!this._pageTokenMap[folder]) {
      this._pageTokenMap[folder] = {};
    }

    const pageToken = this._pageTokenMap[folder][page];
    const opts = { pageToken, maxResults: CONFIG.maxResultsPerPage };
    const listRef = ref(fireStorage, folder);

    return this.imgBucketToImageData(listRef, opts).pipe(
      map(({ imageMap, nextToken }) => {
        this._pageTokenMap[folder][page + 1] = nextToken;
        this._pageMemory.set(page, imageMap);
        return imageMap;
      }),
    );
  }

  upload(files: File[]): void {
    const { queue } = this.fileQueue.add(files);

    this.setState({ queue });

    if (!this.currentUpload) {
      this.getNextUpload();
    }
  }

  pause(): void {
    if (!this.currentUpload) throw 'Error: No active upload';
    const _pushed = this.currentUpload.snapshot.state === 'paused' ? 'resume' : 'pause';
    this.currentUpload[_pushed]();
  }

  cancel(): void {
    if (!this.currentUpload) throw 'Error: No active upload';
    this.currentUpload.cancel();
    this.fileQueue.cancel();
    this.setState({ currentProgressPercentage: 100 });
  }

  delete(names: string[]) {
    const refMap = names.map(name => {
      return from(deleteObject(ref(fireStorage, name))).pipe(catchError(e => {
        console.error(e);
        throw (e);
      }));
    });

    return combineLatest(refMap);
  }

  private getNextUpload() {
    const fileToUpload = this.fileQueue.next();

    if (fileToUpload) {
      const { id, extension } = getNewNameForFile(fileToUpload);
      const storageReference = ref(fireStorage, `${fileToUpload['__folder']}/${id}.${extension}`);
      this.currentUpload = uploadBytesResumable(storageReference, fileToUpload);
      this.handleCurrentUploadProgress(this.currentUpload, id);
    }
  }

  private handleCurrentUploadProgress(currentUpload: UploadTask, uploadedId: number) {
    currentUpload.on('state_changed', (snap) => {
      const progress = snap.bytesTransferred / snap.totalBytes * 100;
      this.setState({ currentProgressPercentage: progress });
    }, (error) => {
      console.error(error);
      this.getNextUpload();
    }, () => {
      this.setState({ uploaded: this._uploadState.value.uploaded + 1, uploadedId });
      this.getNextUpload();
    }
    );
  }

  private setState(p: Partial<UploadState>) {
    const prev = this._uploadState.value;
    this._uploadState.next({ ...prev, ...p });
  }

  private imgBucketToImageData(listRef: StorageReference, opts: { maxResults: number; pageToken: string; }): Observable<{ imageMap: PickedImage[], nextToken: string }> {
    let nextToken = null;
    const imageMap: PickedImage[] = [];

    return from(list(listRef, opts)).pipe(
      concatMap(itemsRef => {
        nextToken = itemsRef.nextPageToken;

        const promiseArray = itemsRef.items.map(i => {
          const id = +i.name.split(imgRegex)[0];
          imageMap.push({ id } as PickedImage);
          return getDownloadURL(i)
        });

        return from(Promise.all(promiseArray));
      }),
      concatMap(urls => {
        const fetchArray = urls.map((url, index) => {
          imageMap[index].imageUrl = url;
          return fetch(url);
        });

        return from(Promise.all(fetchArray));
      }),
      concatMap(fetchResults => {
        const blobArray = fetchResults.map((result) => result.blob());
        return Promise.all(blobArray);
      }),
      map(blobArray => {
        blobArray.forEach((blob, index) => {
          const { id } = imageMap[index];
          imageMap[index].file = new File([blob], `${id}.jpg`);
        });
        return { imageMap, nextToken };
      }),
    );
  }
}
