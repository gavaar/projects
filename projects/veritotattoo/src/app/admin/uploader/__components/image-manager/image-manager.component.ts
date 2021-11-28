import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChange } from '@angular/core';
import { MoyButton } from '@libs/moy-button';
import { ImageData } from '@vero-components/image-storage';
import { combineLatest, Observable, Subject } from 'rxjs';
import { map, startWith, take, takeUntil, tap } from 'rxjs/operators';
import ImageOption from '../image-options/image-option';

@Component({
  selector: 'image-manager',
  templateUrl: './image-manager.component.html',
  styleUrls: ['./image-manager.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageManagerComponent implements OnChanges {
  @Input() images: ImageData[];
  @Output() save = new EventEmitter();
  @Output() cancel = new EventEmitter<void>();
  @Output() delete = new EventEmitter<number>();
  @Output() updateImages = new EventEmitter<ImageData[]>();

  selectAll = new MoyButton({ text: 'Select all' });
  uploadButton = new MoyButton({ text: 'Upload' });
  cancelButton = new MoyButton({ text: 'Cancel' });
  imageOptions: ImageOption[] = [];
  showBulk: Observable<boolean>;

  private _destroy$ = new Subject<void>();

  ngOnChanges({ images }: { images: SimpleChange }): void {
    if (images.currentValue != images.previousValue) {
      const newOptions = images.currentValue.slice(this.imageOptions.length).map((image, i) => new ImageOption(image, this.imageOptions[i]?.selected));
      this.imageOptions = [...this.imageOptions, ...newOptions];
      this.subscribeToSelectionChanges(this.imageOptions);
    }
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  onSelectAll() {
    const atLeastOneSelected = this.imageOptions.find(o => o.selected) != null;
    this.imageOptions.forEach(opt => opt.onSelect(!atLeastOneSelected));
  }

  updateOptions(options: ImageOption[]): void {
    this.imageOptions = options;
    const newImageData = this.optionsToData();
    this.updateImages.emit(newImageData);
  }

  bulkEdit(changes: ImageData) {
    this.imageOptions.forEach(option => {
      if (option.selected) {
        option.onDataUpdate(changes);
      }
    });

    const newImageData = this.optionsToData();
    this.updateImages.emit(newImageData);
  }

  private optionsToData(): ImageData[] {
    return this.imageOptions.map(o => o.imageData);
  }

  private subscribeToSelectionChanges(options: ImageOption[]) {
    this._destroy$.next();

    const selectObs = options.map(o => o.selectedInput.control.valueChanges.pipe(startWith(o.selected)));

    this.showBulk = combineLatest(selectObs).pipe(
      takeUntil(this._destroy$),
      map(val => val.includes(true)),
      tap(show => this.selectAll = new MoyButton({ text: (show ? 'Unselect' : 'Select all') })),
    );
  }
}
