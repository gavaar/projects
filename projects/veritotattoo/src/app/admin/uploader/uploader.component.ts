import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MoyButton } from '@libs/moy-button';
import { MoyFile } from '@libs/moy-input';
import { IMAGE_DATA_PROVIDERS, ImageDataService, ImageStorageService, ImageData, ImgType } from '@vero-components/image-storage';
import { forkJoin, Observable } from 'rxjs';
import { catchError, concatMap, distinctUntilKeyChanged, filter, map, mergeAll, mergeMap, tap } from 'rxjs/operators';
import { DisplayView, FilesManager, filesToImageData, DisplayManager } from './__helper';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { getDownloadURL } from 'firebase/storage';

@Component({
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: IMAGE_DATA_PROVIDERS,
})
export class UploaderComponent implements OnInit {
  filesManager = {
    new: new FilesManager(),
    base: new FilesManager(),
    design: new FilesManager(),
    tattoo: new FilesManager(),
  };
  buttons = {
    back: new MoyButton({ text: '👈 Back to admin' }),
    saveChanges: new MoyButton({ text: 'Save changes' }),
    showSavedChanges: false,
  };
  inputs = {
    file: new MoyFile(),
  };

  displayManager = new DisplayManager();
  DisplayView = DisplayView;

  constructor(public imgStorageService: ImageStorageService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private imgDataService: ImageDataService,) {}

  ngOnInit(): void {
    this.resetManagers();
    this.listenToImageUpload();
  }

  goBack(): void {
    this.router.navigateByUrl('admin');
  }

  onAddPictures(files: File[]) {
    if (!files.length) return;

    this.filesManager.new.loading = true;
    this.displayManager.selectDisplay(DisplayView.New);

    const newImages = [...this.filesManager.new.files, ...filesToImageData(files, this.sanitizer)];
    this.filesManager.new.files = newImages;
    this.filesManager.new.loading = false;
  }

  onSaveNewFiles(): void {
    const rawFiles = this.filesManager.new.rawFiles();
    this.imgStorageService.upload(rawFiles);
    this.displayManager.selectDisplay(DisplayView.Old);
  }

  onCancelNewUpload(): void {
    this.filesManager.new.files = [];
    this.displayManager.selectDisplay(DisplayView.Old);
  }

  loadMoreImages(folder: ImgType = 'base', page = 0): void {
    this.imagesInFolder(folder, page).subscribe(imgData => {
      const manager = (() => {
        switch(folder) {
          case 'base':
            return this.filesManager.base;
          case 'design':
            return this.filesManager.design;
          case 'tattoo':
            return this.filesManager.tattoo;
        }
      })();

      manager.files = [...manager.files, ...imgData];
    });
  }

  updateImages(folder: ImgType | 'new', newFiles: ImageData[]): void {
    this.filesManager[folder].files = newFiles;

    if (folder !== 'new') {
      const { base: changed_base, design: changed_design, tattoo: changed_tattoo } = this.getChangedFolders();
      const { base: deleted_base, design: deleted_design, tattoo: deleted_tattoo } = this.getDeletedFiles();
      const isChanged = changed_base.length || changed_design.length || changed_tattoo.length;
      const isDeleted = deleted_base.length || deleted_design.length || deleted_tattoo.length;
      this.buttons.showSavedChanges = (isChanged || isDeleted) > 0;
    }
  }

  onSaveChanged(): void {
    this.buttons.saveChanges.text = 'loading...';
    this.buttons.saveChanges.disabled = true;

    const { base: changed_base, design: changed_design, tattoo: changed_tattoo } = this.getChangedFolders();
    const { base: deleted_base, design: deleted_design, tattoo: deleted_tattoo } = this.getDeletedFiles();

    const baseToDelete = changed_base.filter(imgData => imgData.folder).map(d => d.id).concat(deleted_base);
    const designToDelete = changed_design.filter(imgData => imgData.folder).map(d => d.id).concat(deleted_design);
    const tattooToDelete = changed_tattoo.filter(imgData => imgData.folder).map(d => d.id).concat(deleted_tattoo);

    const fileDeletions = [
      ...baseToDelete.map(d => `base/${d}`),
      ...designToDelete.map(d => `design/${d}`),
      ...tattooToDelete.map(d => `tattoo/${d}`),
    ];
    const additionIds = {
      base: changed_base.filter(d => d.folder).map(d => d.id),
      design: changed_design.filter(d => d.folder).map(d => d.id),
      tattoo: changed_tattoo.filter(d => d.folder).map(d => d.id),
    };
    const fileAdditions = [
      ...this.filesManager.base.rawFiles(additionIds.base),
      ...this.filesManager.design.rawFiles(additionIds.design),
      ...this.filesManager.tattoo.rawFiles(additionIds.tattoo),
    ];

    const updateFolderStorage = this.imgStorageService.delete(fileDeletions).pipe(tap(() => {
      this.imgStorageService.upload(fileAdditions);   
    }));
    const deleteFromData = [...deleted_base, ...deleted_design, ...deleted_tattoo].map(id => {
      return this.imgDataService.delete(id);
    });
    const updateFromData = [...changed_base, ...changed_design, ...changed_tattoo].map(changed => {
      const { id, folder, available, description } = changed;
      return this.imgDataService.set({ id, available, description, folder });
    });

    forkJoin([...deleteFromData, ...updateFromData, updateFolderStorage]).subscribe(() => {
      this.buttons.showSavedChanges = false;
      this.buttons.saveChanges.text = 'Save changes';
      this.buttons.saveChanges.disabled = false;
      }, (error) => console.error(error));
  }

  private resetManagers(): void {
    this.buttons.showSavedChanges = false;
    this.resetManager('base');
    this.resetManager('design');
    this.resetManager('tattoo');
  }

  private resetManager(folder: ImgType): void {
    this.filesManager[folder].files = [];
    this.filesManager[folder].loading = true;
    this.loadMoreImages(folder);
  }

  private getChangedFolders(): { base: ImageData[]; design: ImageData[]; tattoo: ImageData[] } {
    const base = this.filesManager.base.changedFiles();
    const design = this.filesManager.design.changedFiles();
    const tattoo = this.filesManager.tattoo.changedFiles();
    return { base, design, tattoo };
  }

  private getDeletedFiles(): { base: number[]; design: number[]; tattoo: number[] } {
    const base = this.filesManager.base.deletedFiles();
    const design = this.filesManager.design.deletedFiles();
    const tattoo = this.filesManager.tattoo.deletedFiles();
    return { base, design, tattoo };
  }

  private listenToImageUpload(): void {
    this.imgStorageService.uploadState.pipe(
      distinctUntilKeyChanged('uploaded'),
      filter(({ uploaded }) => uploaded > 0),
      concatMap(({ uploadedId }) => {
        const { base, design, tattoo } = this.filesManager;
        let fileData = [...base.files, ...design.files, ...tattoo.files].find(imgData => imgData.id === uploadedId);

        if (!fileData) {
          const newFiles = this.filesManager.new.files;
          fileData = newFiles.shift();
          this.filesManager.new.files = newFiles;
        }

        const getImageUrl = () => this.imgStorageService.downloadUrl(fileData.folder, uploadedId);
        const uploadedFileData = { ...fileData, id: uploadedId };

        return this.imgDataService.set(uploadedFileData).pipe(
          concatMap(getImageUrl),
          catchError(error => { throw error }),
          map((imageUrl) => ({ ...uploadedFileData, imageUrl })),
        );
      }),
    ).subscribe(uploadedFileData => {
      const folderManager = this.filesManager[uploadedFileData.folder];
      this.filesManager.base.remove([uploadedFileData.id]);
      this.filesManager.design.remove([uploadedFileData.id]);
      this.filesManager.tattoo.remove([uploadedFileData.id]);
      folderManager.files = [...folderManager.files, uploadedFileData];
      console.log(this.filesManager);
    }, err => console.error(err));
  }

  private imagesInFolder(folder: ImgType, page = 0): Observable<ImageData[]> {
    return this.imgStorageService.list(folder, page).pipe(
      concatMap(imageList => {
        return this.imgDataService.getList(imageList);
      }),
      map((imageDataMap: { [k: string]: ImageData }) => Object.values(imageDataMap)),
    );
  }
}
