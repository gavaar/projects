import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MoyButton } from '@libs/moy-button';
import { MoyFile } from '@libs/moy-input';
import { IMAGE_DATA_PROVIDERS, ImageDataService, ImageStorageService, ImageData, ImgType } from '@vero-components/image-storage';
import { Observable } from 'rxjs';
import { catchError, concatMap, distinctUntilKeyChanged, filter, map, mergeMap, tap } from 'rxjs/operators';
import { DisplayView, FilesManager, filesToImageData } from './__helper';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: IMAGE_DATA_PROVIDERS,
})
export class UploaderComponent implements OnInit {
  filesManager = new FilesManager();
  backButton = new MoyButton({ text: '👈 Back to admin' });
  fileInput = new MoyFile({});
  DisplayView = DisplayView;
  folderImages: { [folder in ImgType]?: Observable<ImageData[]> };

  constructor(public imgStorageService: ImageStorageService,
    private location: Location,
    private sanitizer: DomSanitizer,
    private imgDataService: ImageDataService,) {}

  ngOnInit(): void {
    this.folderImages = {
      base: this.imagesInFolder('base'),
      tattoo: this.imagesInFolder('tattoo'),
      design: this.imagesInFolder('design'),
    };
  }

  goBack(): void {
    this.location.back();
  }

  onAddPictures(files: File[]) {
    if (!files.length) return;

    this.filesManager.loading = true;
    this.filesManager.selectDisplay(DisplayView.New);

    const newImages = [...this.filesManager.newFiles, ...filesToImageData(files, this.sanitizer)];
    this.filesManager.newFiles = newImages;
    this.filesManager.loading = false;
  }

  onSaveNewFiles(): void {
    const filesData = this.filesManager.newFiles;

    this.listenToImageUpload(filesData);

    const rawFiles = this.filesManager.rawFiles();
    this.imgStorageService.upload(rawFiles);
    this.filesManager.clear();
  }

  onDeleteFromNewFiles(index: number): void {
    const imagesWithoutRemoved = this.filesManager.newFiles.filter((f, i) => i !== index);

    if (imagesWithoutRemoved.length) {
      this.filesManager.newFiles = imagesWithoutRemoved;
    } else {
      this.onCancelNewUpload();
    }
  }

  onCancelNewUpload(): void {
    this.filesManager.newFiles = [];
    this.filesManager.selectDisplay(DisplayView.Old);
  }

  private listenToImageUpload(filesData: ImageData[]): void {
    this.imgStorageService.uploadState.pipe(
      distinctUntilKeyChanged('uploaded'),
      filter(({ uploaded }) => uploaded > 0),
      mergeMap(({ uploaded, uploadedId }) => {
        const uploadedFileData = { ...filesData[uploaded - 1], id: uploadedId };
        return this.imgDataService.set(uploadedFileData).pipe(catchError(error => { throw error }));
      }),
    ).subscribe();
  }


  private imagesInFolder(folder: ImgType, page = 0): Observable<ImageData[]> {
    return this.imgStorageService.getList(folder, page).pipe(
      concatMap(imageList => {
        console.log(imageList);
        return this.imgDataService.getList(imageList);
      }),
      map((imageDataMap: { [k: string]: ImageData }) => Object.values(imageDataMap)),
    );
  }
}
